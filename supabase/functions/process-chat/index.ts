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
    
    // Enhanced intent detection with better keyword recognition
    let intent = 'general'
    if (lowerMessage.match(/\b(search|find|buy|looking for|show me|want|need|get me)\b/)) {
      intent = 'product_search'
    } else if (lowerMessage.match(/\b(compare|price|cost|cheap|expensive|vs)\b/)) {
      intent = 'price_comparison'
    } else if (lowerMessage.match(/\b(deal|offer|discount|sale|bargain)\b/)) {
      intent = 'deals_exploration'
    } else if (lowerMessage.includes('order') && lowerMessage.includes('status')) {
      intent = 'order_status'
    } else if (lowerMessage.match(/\b(recommend|suggest|advice|opinion)\b/)) {
      intent = 'recommendations'
    }

    // Enhanced entity extraction with better pattern matching
    const entities: ExtractedEntities = {}
    
    // Category detection with comprehensive keywords
    if (lowerMessage.match(/\b(phone|mobile|smartphone|cellphone|iphone|android)\b/)) {
      entities.category = 'electronics'
    } else if (lowerMessage.match(/\b(laptop|computer|pc|macbook|notebook)\b/)) {
      entities.category = 'electronics'
    } else if (lowerMessage.match(/\b(shirt|jeans|clothes|clothing|dress|shoes|fashion)\b/)) {
      entities.category = 'clothing'
    } else if (lowerMessage.match(/\b(headphone|earphone|airpods|speaker|audio)\b/)) {
      entities.category = 'electronics'
    }
    
    // Enhanced brand detection with comprehensive list
    const brands = [
      'samsung', 'apple', 'nike', 'adidas', 'sony', 'lg', 'oneplus', 
      'xiaomi', 'realme', 'oppo', 'vivo', 'honor', 'motorola', 'huawei',
      'dell', 'hp', 'lenovo', 'asus', 'acer', 'microsoft', 'bose',
      'jbl', 'sennheiser', 'beats'
    ]
    
    for (const brand of brands) {
      const brandRegex = new RegExp(`\\b${brand}\\b`, 'i')
      if (brandRegex.test(lowerMessage)) {
        entities.brand = brand.charAt(0).toUpperCase() + brand.slice(1)
        break
      }
    }

    // Enhanced price extraction with better patterns
    const pricePatterns = [
      // "under X" patterns
      { pattern: /under\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'max' },
      { pattern: /below\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'max' },
      { pattern: /less\s+than\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'max' },
      { pattern: /within\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'max' },
      { pattern: /budget\s+(?:of\s+)?(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'max' },
      
      // "above X" patterns
      { pattern: /above\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'min' },
      { pattern: /more\s+than\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'min' },
      { pattern: /over\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'min' },
      { pattern: /starting\s+(?:from\s+)?(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'min' },
      
      // Range patterns
      { pattern: /(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)\s*(?:to|-)\s*(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'range' },
      { pattern: /between\s+(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)\s*(?:and|to|-)\s*(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)/i, type: 'range' }
    ]
    
    for (const { pattern, type } of pricePatterns) {
      const match = lowerMessage.match(pattern)
      if (match) {
        if (type === 'max') {
          entities.price_range = { max: parseInt(match[1].replace(/,/g, '')) }
        } else if (type === 'min') {
          entities.price_range = { min: parseInt(match[1].replace(/,/g, '')) }
        } else if (type === 'range' && match[2]) {
          const min = parseInt(match[1].replace(/,/g, ''))
          const max = parseInt(match[2].replace(/,/g, ''))
          entities.price_range = { min: Math.min(min, max), max: Math.max(min, max) }
        }
        console.log(`Detected price filter: ${type} =`, entities.price_range)
        break
      }
    }

    console.log('Enhanced extraction result:', { intent, entities })

    return {
      intent: intent,
      entities: entities,
      language: 'en',
      confidence: 0.85,
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
    const productCount = products.length
    
    const contextualResponses = {
      'product_search': `I found ${productCount} products matching your search criteria. Here are some great options for you!`,
      'price_comparison': `Here are ${productCount} products with price comparisons to help you find the best deals.`,
      'deals_exploration': `Great news! I've found ${productCount} amazing deals and offers just for you.`,
      'recommendations': `Based on your preferences, here are ${productCount} personalized recommendations that I think you'll love.`,
      'order_status': `Let me check your order status for you. I'll get the latest information.`,
      'reorder': `I can help you reorder your previous purchases. Would you like to see your order history?`,
      'product_details': `Here are the detailed specifications and information for ${productCount} products.`,
      'general': `I'm here to help you find exactly what you're looking for! What would you like to shop for today?`
    }

    let response = contextualResponses[intent] || "How can I help you with your shopping today?"

    // Add entity-based context
    const contextParts = []
    
    if (query.entities.category) {
      contextParts.push(`I see you're interested in ${query.entities.category}.`)
    }
    
    if (query.entities.brand) {
      contextParts.push(`Looking for ${query.entities.brand} products specifically.`)
    }
    
    if (query.entities.price_range) {
      const { min, max } = query.entities.price_range
      if (max && !min) {
        contextParts.push(`Within your budget of ₹${max.toLocaleString()}.`)
      } else if (min && max) {
        contextParts.push(`In the price range of ₹${min.toLocaleString()} to ₹${max.toLocaleString()}.`)
      } else if (min && !max) {
        contextParts.push(`Starting from ₹${min.toLocaleString()}.`)
      }
    }
    
    if (contextParts.length > 0) {
      response += ' ' + contextParts.join(' ')
    }

    return response
  } catch (error) {
    console.error('Response generation error:', error)
    return "I'm here to help you find what you're looking for!"
  }
}

async function intelligentProductScraping(entities: ExtractedEntities, originalQuery: string): Promise<any[]> {
  try {
    console.log('Starting enhanced product scraping for:', { entities, originalQuery })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Calling enhanced scrape-products function with:', {
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

    console.log('Enhanced scrape-products response:', { 
      data: data ? { 
        source: data.source, 
        productCount: data.products?.length || 0,
        message: data.message 
      } : null, 
      error 
    })

    if (error) {
      console.error('Scraping function error:', error)
      return []
    }

    if (data?.products && data.products.length > 0) {
      console.log(`✅ Successfully retrieved ${data.products.length} products (source: ${data.source})`)
      return data.products
    }

    console.log('No products returned from enhanced scraper')
    return []

  } catch (error) {
    console.error('Error in intelligentProductScraping:', error)
    return []
  }
}

async function getPersonalizedRecommendations(userId: string, entities: ExtractedEntities, originalQuery: string): Promise<any[]> {
  return await intelligentProductScraping(entities, originalQuery)
}
