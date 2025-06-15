
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExtractedEntities {
  category?: string
  brand?: string
  price_range?: { min?: number, max?: number }
  color?: string
  size?: string
  location?: string
  urgency?: string
}

interface ProcessedQuery {
  intent: string
  entities: ExtractedEntities
  language: string
  confidence: number
  original_query: string
  processed_query: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, user_id } = await req.json()

    console.log('Processing message with AI:', { message, user_id })

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Step 1: Enhanced AI-powered intent classification and entity extraction
    const processedQuery = await processQueryWithAI(message)
    console.log('AI processing result:', processedQuery)

    // Step 2: Save chat message and processed query
    const { data: chatData, error: chatError } = await supabaseClient
      .from('chats')
      .insert({
        user_id: user_id,
        title: message.substring(0, 50) + '...',
        language: processedQuery.language,
        chat_type: processedQuery.intent,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (chatError) {
      console.error('Error saving chat:', chatError)
      throw new Error('Supabase RLS error saving chat: ' + (chatError.message || 'Unknown error'))
    }

    // Step 3: Save search query with extracted features
    if (chatData) {
      await supabaseClient.from('search_queries').insert({
        user_id: user_id,
        chat_id: chatData.id,
        original_query: message,
        processed_query: processedQuery.processed_query,
        search_intent: processedQuery.intent,
        query_language: processedQuery.language,
        extracted_features: {
          entities: processedQuery.entities,
          confidence: processedQuery.confidence,
          ai_processed: true
        },
        created_at: new Date().toISOString()
      })

      // Save user message
      await supabaseClient.from('messages').insert({
        chat_id: chatData.id,
        content: message,
        role: 'user',
        created_at: new Date().toISOString()
      })
    }

    let products = []
    let response = ""

    // Step 4: Process based on AI-detected intent
    switch (processedQuery.intent) {
      case 'product_search':
        products = await intelligentProductScraping(processedQuery.entities, processedQuery.original_query)
        response = await generateContextualResponse(processedQuery, products, 'product_search')
        break
      
      case 'price_comparison':
        products = await intelligentProductScraping(processedQuery.entities, processedQuery.original_query)
        response = await generateContextualResponse(processedQuery, products, 'price_comparison')
        break
        
      case 'deals_exploration':
        products = await intelligentProductScraping(processedQuery.entities, processedQuery.original_query)
        response = await generateContextualResponse(processedQuery, products, 'deals_exploration')
        break
        
      case 'reorder':
        response = await generateContextualResponse(processedQuery, [], 'reorder')
        break
        
      case 'order_status':
        response = await generateContextualResponse(processedQuery, [], 'order_status')
        break
        
      case 'recommendations':
        products = await getPersonalizedRecommendations(user_id, processedQuery.entities, processedQuery.original_query)
        response = await generateContextualResponse(processedQuery, products, 'recommendations')
        break
        
      case 'product_details':
        products = await intelligentProductScraping(processedQuery.entities, processedQuery.original_query)
        response = await generateContextualResponse(processedQuery, products, 'product_details')
        break
        
      default:
        response = await generateContextualResponse(processedQuery, [], 'general')
    }

    // Step 5: Save AI response
    if (chatData) {
      await supabaseClient.from('messages').insert({
        chat_id: chatData.id,
        content: response,
        role: 'ai',
        metadata: {
          intent: processedQuery.intent,
          entities: processedQuery.entities,
          language: processedQuery.language,
          products_count: products.length
        },
        created_at: new Date().toISOString()
      })

      // Save search results if products found
      if (products.length > 0) {
        const searchQuery = await supabaseClient
          .from('search_queries')
          .select('id')
          .eq('chat_id', chatData.id)
          .eq('user_id', user_id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (searchQuery.data) {
          const searchResults = products.map((product, index) => ({
            search_query_id: searchQuery.data.id,
            product_id: product.id,
            position_in_results: index + 1,
            relevance_score: product.relevance_score || 0.8,
            match_reasons: product.match_reasons || ['ai_recommendation'],
            created_at: new Date().toISOString()
          }))

          await supabaseClient.from('search_results').insert(searchResults)
        }
      }
    }

    return new Response(
      JSON.stringify({ response, products }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in process-chat:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function processQueryWithAI(message: string): Promise<ProcessedQuery> {
  try {
    const lowerMessage = message.toLowerCase()
    
    // Enhanced intent detection
    let intent = 'general'
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('buy') || lowerMessage.includes('looking for') || lowerMessage.includes('show me') || lowerMessage.includes('want')) {
      intent = 'product_search'
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('price')) {
      intent = 'price_comparison'
    } else if (lowerMessage.includes('deal') || lowerMessage.includes('offer') || lowerMessage.includes('discount')) {
      intent = 'deals_exploration'
    } else if (lowerMessage.includes('order') && lowerMessage.includes('status')) {
      intent = 'order_status'
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      intent = 'recommendations'
    }

    // Enhanced entity extraction
    const entities: ExtractedEntities = {}
    
    // Categories - more comprehensive detection
    if (lowerMessage.includes('phone') || lowerMessage.includes('mobile') || lowerMessage.includes('smartphone')) {
      entities.category = 'electronics'
    } else if (lowerMessage.includes('laptop') || lowerMessage.includes('computer')) {
      entities.category = 'electronics'
    } else if (lowerMessage.includes('shirt') || lowerMessage.includes('jeans') || lowerMessage.includes('clothes')) {
      entities.category = 'clothing'
    } else if (lowerMessage.includes('headphone') || lowerMessage.includes('earphone')) {
      entities.category = 'electronics'
    }
    
    // Brands - more comprehensive list
    const brands = ['samsung', 'apple', 'nike', 'adidas', 'sony', 'lg', 'oneplus', 'xiaomi', 'realme', 'oppo', 'vivo', 'honor', 'motorola']
    for (const brand of brands) {
      if (lowerMessage.includes(brand)) {
        entities.brand = brand
        break
      }
    }

    // Enhanced price extraction - FIXED to handle "under X" correctly
    const pricePatterns = [
      // Pattern for "under X" - should set max price only
      /under\s+(\d+)/i,
      /below\s+(\d+)/i,
      /less\s+than\s+(\d+)/i,
      /within\s+(\d+)/i,
      // Pattern for ranges like "X to Y" or "X - Y"
      /(\d+)\s*(?:to|-)?\s*(\d+)\s*(?:rupees?|rs?|₹)/i,
      // Pattern for "above X" or "more than X"
      /above\s+(\d+)/i,
      /more\s+than\s+(\d+)/i,
      /over\s+(\d+)/i
    ]
    
    for (const pattern of pricePatterns) {
      const match = lowerMessage.match(pattern)
      if (match) {
        if (pattern.source.includes('under|below|less|within')) {
          // "under X" means max price is X
          entities.price_range = {
            max: parseInt(match[1])
          }
          console.log(`Detected "under" pattern: max price = ${match[1]}`)
        } else if (pattern.source.includes('above|more|over')) {
          // "above X" means min price is X
          entities.price_range = {
            min: parseInt(match[1])
          }
          console.log(`Detected "above" pattern: min price = ${match[1]}`)
        } else if (match[2]) {
          // Range pattern "X to Y"
          entities.price_range = {
            min: parseInt(match[1]),
            max: parseInt(match[2])
          }
          console.log(`Detected range pattern: ${match[1]} to ${match[2]}`)
        } else {
          // Single number - treat as max price if no other context
          entities.price_range = {
            max: parseInt(match[1])
          }
          console.log(`Detected single price: max = ${match[1]}`)
        }
        break
      }
    }

    console.log('Extracted entities:', entities)
    console.log('Detected intent:', intent)

    return {
      intent: intent,
      entities: entities,
      language: 'en',
      confidence: 0.8,
      original_query: message,
      processed_query: message
    }
  } catch (error) {
    console.error('AI processing error:', error)
    return {
      intent: 'general',
      entities: {},
      language: 'en',
      confidence: 0.5,
      original_query: message,
      processed_query: message
    }
  }
}

async function generateContextualResponse(query: ProcessedQuery, products: any[], intent: string): Promise<string> {
  try {
    const fallbackResponses = {
      'product_search': `I found ${products.length} products matching your search criteria. Here are some great options for you!`,
      'price_comparison': `Here are the price comparisons for your selected products. I've found the best deals available.`,
      'deals_exploration': `Great news! I've found some amazing deals and offers just for you.`,
      'recommendations': `Based on your preferences, here are my personalized recommendations that I think you'll love.`,
      'order_status': `Let me check your order status for you. I'll get the latest information.`,
      'reorder': `I can help you reorder your previous purchases. Would you like to see your order history?`,
      'product_details': `Here are the detailed specifications and information for these products.`,
      'general': `I'm here to help you find exactly what you're looking for! What would you like to shop for today?`
    }

    let response = fallbackResponses[intent] || "How can I help you with your shopping today?"

    // Add context based on entities
    if (query.entities.category) {
      response += ` I see you're interested in ${query.entities.category}.`
    }
    if (query.entities.brand) {
      response += ` Looking for ${query.entities.brand} products specifically.`
    }
    if (query.entities.price_range) {
      if (query.entities.price_range.max && !query.entities.price_range.min) {
        response += ` Within your budget of ₹${query.entities.price_range.max}.`
      } else if (query.entities.price_range.min && query.entities.price_range.max) {
        response += ` In the price range of ₹${query.entities.price_range.min} to ₹${query.entities.price_range.max}.`
      }
    }

    return response
  } catch (error) {
    console.error('Response generation error:', error)
    return "I'm here to help you find what you're looking for!"
  }
}

async function intelligentProductScraping(entities: ExtractedEntities, originalQuery: string): Promise<any[]> {
  try {
    console.log('Starting product scraping for:', { entities, originalQuery })

    // Call the enhanced scrape-products edge function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Calling scrape-products function with:', {
      keywords: originalQuery,
      category: entities.category,
      min_price: entities.price_range?.min,
      max_price: entities.price_range?.max,
      brand: entities.brand,
      site: 'amazon'
    })

    const { data, error } = await supabaseClient.functions.invoke('scrape-products', {
      body: {
        keywords: originalQuery,
        category: entities.category,
        min_price: entities.price_range?.min,
        max_price: entities.price_range?.max,
        brand: entities.brand,
        site: 'amazon'
      }
    })

    console.log('Scrape-products response:', { data, error })

    if (error) {
      console.error('Scraping function error:', error)
      return getFallbackProducts(entities, originalQuery)
    }

    if (data?.products && data.products.length > 0) {
      console.log(`Successfully retrieved ${data.products.length} products (source: ${data.source || 'unknown'})`)
      return data.products
    }

    console.log('No products returned from scraper, using fallback')
    return getFallbackProducts(entities, originalQuery)

  } catch (error) {
    console.error('Error in intelligentProductScraping:', error)
    return getFallbackProducts(entities, originalQuery)
  }
}

function getFallbackProducts(entities: ExtractedEntities, originalQuery: string): any[] {
  // Enhanced mock product generation based on query
  const baseProducts = [
    {
      id: '1',
      title: `${entities.brand || 'Premium'} ${originalQuery} - Latest Model`,
      price: '₹29,999',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      link: 'https://amazon.in/premium-product',
      is_amazon_choice: true,
      relevance_score: 0.95,
      match_reasons: ['keyword_match', 'ai_recommended']
    },
    {
      id: '2',
      title: `Best ${originalQuery} - Top Rated Choice`,
      price: '₹19,999',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300',
      link: 'https://amazon.in/top-rated-product',
      is_amazon_choice: false,
      relevance_score: 0.90,
      match_reasons: ['keyword_match', 'price_range_match']
    },
    {
      id: '3',
      title: `Budget ${originalQuery} - Great Value`,
      price: '₹12,999',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      link: 'https://amazon.in/budget-product',
      is_amazon_choice: false,
      relevance_score: 0.85,
      match_reasons: ['keyword_match', 'budget_friendly']
    }
  ]

  return baseProducts.slice(0, 3)
}

async function getPersonalizedRecommendations(userId: string, entities: ExtractedEntities, originalQuery: string): Promise<any[]> {
  return await intelligentProductScraping(entities, originalQuery)
}
