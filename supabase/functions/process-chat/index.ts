
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1'

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

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    console.log('Processing message with AI:', { message, user_id })

    // Step 1: Detect language and translate if needed
    const languageResult = await detectLanguage(message)
    console.log('Language detection result:', languageResult)

    // Step 2: Enhanced AI-powered intent classification and entity extraction
    const processedQuery = await processQueryWithAI(message, languageResult.language)
    console.log('AI processing result:', processedQuery)

    // Step 3: Save chat message and processed query
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
    }

    // Step 4: Save search query with extracted features
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

    // Step 5: Process based on AI-detected intent
    switch (processedQuery.intent) {
      case 'product_search':
        products = await intelligentProductSearch(processedQuery.entities)
        response = await generateContextualResponse(processedQuery, products, 'product_search')
        break
      
      case 'price_comparison':
        products = await intelligentProductSearch(processedQuery.entities)
        response = await generateContextualResponse(processedQuery, products, 'price_comparison')
        break
        
      case 'deals_exploration':
        products = await getDealsAndOffers(processedQuery.entities)
        response = await generateContextualResponse(processedQuery, products, 'deals_exploration')
        break
        
      case 'reorder':
        // Get user's previous orders
        response = await generateContextualResponse(processedQuery, [], 'reorder')
        break
        
      case 'order_status':
        response = await generateContextualResponse(processedQuery, [], 'order_status')
        break
        
      case 'recommendations':
        products = await getPersonalizedRecommendations(user_id, processedQuery.entities)
        response = await generateContextualResponse(processedQuery, products, 'recommendations')
        break
        
      case 'product_details':
        products = await intelligentProductSearch(processedQuery.entities)
        response = await generateContextualResponse(processedQuery, products, 'product_details')
        break
        
      default:
        response = await generateContextualResponse(processedQuery, [], 'general')
    }

    // Step 6: Translate response back to user's language if needed
    if (processedQuery.language !== 'en') {
      response = await translateResponse(response, 'en', processedQuery.language)
    }

    // Step 7: Save AI response
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

async function queryHuggingFace(prompt: string): Promise<any> {
  const response = await fetch(HUGGING_FACE_API, {
    headers: {
      'Authorization': `Bearer ${Deno.env.get('HUGGING_FACE_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        return_full_text: false
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`)
  }

  const result = await response.json()
  return result
}

async function detectLanguage(message: string): Promise<{ language: string, confidence: number }> {
  const prompt = `Detect the language of this text and respond with just the ISO language code (en, hi, ta, etc.): "${message}"`
  
  try {
    const result = await queryHuggingFace(prompt)
    const detectedLang = result[0]?.generated_text?.trim().toLowerCase() || 'en'
    
    // Map common language variations
    const langMap: { [key: string]: string } = {
      'english': 'en',
      'hindi': 'hi',
      'tamil': 'ta',
      'telugu': 'te',
      'gujarati': 'gu',
      'marathi': 'mr'
    }
    
    const normalizedLang = langMap[detectedLang] || detectedLang.substring(0, 2)
    
    return {
      language: normalizedLang,
      confidence: 0.8
    }
  } catch (error) {
    console.error('Language detection error:', error)
    return { language: 'en', confidence: 0.5 }
  }
}

async function processQueryWithAI(message: string, language: string): Promise<ProcessedQuery> {
  const prompt = `Analyze this ${language} message and extract:
1. Intent (product_search, price_comparison, deals_exploration, reorder, order_status, recommendations, product_details, general)
2. Entities: category, brand, price_range, color, size, location, urgency

Message: "${message}"

Respond in JSON format:
{
  "intent": "intent_name",
  "entities": {
    "category": "electronics/clothing/home/etc",
    "brand": "brand_name",
    "price_range": {"min": 1000, "max": 5000},
    "color": "color_name",
    "size": "size_spec",
    "location": "location",
    "urgency": "urgent/normal/flexible"
  },
  "confidence": 0.85
}`

  try {
    const result = await queryHuggingFace(prompt)
    const aiResponse = result[0]?.generated_text || '{}'
    
    // Extract JSON from AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    let parsedResult
    
    if (jsonMatch) {
      try {
        parsedResult = JSON.parse(jsonMatch[0])
      } catch {
        parsedResult = extractIntentAndEntitiesBasic(message)
      }
    } else {
      parsedResult = extractIntentAndEntitiesBasic(message)
    }

    return {
      intent: parsedResult.intent || 'general',
      entities: parsedResult.entities || {},
      language: language,
      confidence: parsedResult.confidence || 0.7,
      original_query: message,
      processed_query: message
    }
  } catch (error) {
    console.error('AI processing error:', error)
    return {
      intent: 'general',
      entities: {},
      language: language,
      confidence: 0.5,
      original_query: message,
      processed_query: message
    }
  }
}

function extractIntentAndEntitiesBasic(message: string): any {
  const lowerMessage = message.toLowerCase()
  
  // Basic intent detection
  let intent = 'general'
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('buy')) {
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

  // Basic entity extraction
  const entities: ExtractedEntities = {}
  
  // Categories
  if (lowerMessage.includes('phone') || lowerMessage.includes('mobile') || lowerMessage.includes('laptop')) {
    entities.category = 'electronics'
  } else if (lowerMessage.includes('shirt') || lowerMessage.includes('jeans') || lowerMessage.includes('clothes')) {
    entities.category = 'clothing'
  }
  
  // Brands
  const brands = ['samsung', 'apple', 'nike', 'adidas', 'sony', 'lg']
  for (const brand of brands) {
    if (lowerMessage.includes(brand)) {
      entities.brand = brand
      break
    }
  }
  
  return { intent, entities, confidence: 0.6 }
}

async function generateContextualResponse(query: ProcessedQuery, products: any[], intent: string): Promise<string> {
  const prompt = `Generate a helpful response for a ${query.language} user with intent "${intent}".
Query: "${query.original_query}"
Entities: ${JSON.stringify(query.entities)}
Products found: ${products.length}

Generate a natural, helpful response in ${query.language === 'en' ? 'English' : 'the detected language'}:`

  try {
    const result = await queryHuggingFace(prompt)
    let response = result[0]?.generated_text || ''
    
    // Clean up the response
    response = response.replace(prompt, '').trim()
    
    if (!response) {
      // Fallback responses based on intent
      const fallbackResponses = {
        'product_search': `I found ${products.length} products matching your search criteria.`,
        'price_comparison': `Here are the price comparisons for your selected products.`,
        'deals_exploration': `I've found some great deals for you!`,
        'recommendations': `Based on your preferences, here are my recommendations.`,
        'order_status': `Let me check your order status for you.`,
        'reorder': `I can help you reorder your previous purchases.`,
        'product_details': `Here are the detailed specifications for these products.`,
        'general': `I'm here to help you with your shopping needs. What would you like to find?`
      }
      response = fallbackResponses[intent] || "How can I help you today?"
    }
    
    return response
  } catch (error) {
    console.error('Response generation error:', error)
    return "I'm here to help you find what you're looking for!"
  }
}

async function translateResponse(text: string, fromLang: string, toLang: string): Promise<string> {
  if (fromLang === toLang) return text
  
  const prompt = `Translate this text from ${fromLang} to ${toLang}: "${text}"`
  
  try {
    const result = await queryHuggingFace(prompt)
    return result[0]?.generated_text?.replace(prompt, '').trim() || text
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

async function intelligentProductSearch(entities: ExtractedEntities): Promise<any[]> {
  // Enhanced mock product search based on AI-extracted entities
  const mockProducts = [
    {
      id: '1',
      title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone',
      price: '₹1,29,999',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      link: 'https://amazon.in/samsung-galaxy-s24-ultra',
      is_amazon_choice: true,
      relevance_score: 0.95,
      match_reasons: ['brand_match', 'category_match', 'ai_recommended']
    },
    {
      id: '2',
      title: 'Apple iPhone 15 Pro (128 GB) - Natural Titanium',
      price: '₹1,34,900',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300',
      link: 'https://amazon.in/apple-iphone-15-pro',
      is_amazon_choice: false,
      relevance_score: 0.90,
      match_reasons: ['brand_match', 'category_match']
    },
    {
      id: '3',
      title: 'Sony WH-CH720N Wireless Noise Canceling Headphones',
      price: '₹8,990',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      link: 'https://amazon.in/sony-headphones',
      is_amazon_choice: true,
      relevance_score: 0.85,
      match_reasons: ['brand_match', 'price_range_match']
    }
  ]
  
  // Filter based on extracted entities
  let filteredProducts = mockProducts
  
  if (entities.brand) {
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(entities.brand!.toLowerCase())
    )
  }
  
  if (entities.category) {
    const categoryKeywords = {
      'electronics': ['smartphone', 'phone', 'headphones', 'laptop'],
      'clothing': ['shirt', 'jeans', 'dress', 'shoes'],
      'home': ['kitchen', 'furniture', 'appliances']
    }
    
    const keywords = categoryKeywords[entities.category as keyof typeof categoryKeywords] || []
    if (keywords.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        keywords.some(keyword => product.title.toLowerCase().includes(keyword))
      )
    }
  }
  
  return filteredProducts.slice(0, 3)
}

async function getDealsAndOffers(entities: ExtractedEntities): Promise<any[]> {
  // Mock deals based on entities
  const deals = await intelligentProductSearch(entities)
  return deals.map(product => ({
    ...product,
    original_price: product.price.replace('₹', '₹1,50,'),
    discount_percentage: '20%',
    deal_badge: 'Limited Time Offer'
  }))
}

async function getPersonalizedRecommendations(userId: string, entities: ExtractedEntities): Promise<any[]> {
  // In a real implementation, this would use user's purchase history and preferences
  return await intelligentProductSearch(entities)
}
