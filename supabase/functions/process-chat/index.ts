
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Simple NLP processing - extract keywords and intent
    const intent = extractIntent(message)
    const keywords = extractKeywords(message)
    const filters = extractFilters(message)

    console.log('Processing message:', { message, intent, keywords, filters })

    // Save chat message
    const { data: chatData, error: chatError } = await supabaseClient
      .from('chats')
      .insert({
        user_id: user_id,
        title: message.substring(0, 50) + '...',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (chatError) {
      console.error('Error saving chat:', chatError)
    }

    // Save user message
    if (chatData) {
      await supabaseClient.from('messages').insert({
        chat_id: chatData.id,
        content: message,
        sender: 'user',
        created_at: new Date().toISOString()
      })
    }

    let products = []
    let response = "I found some products for you based on your request."

    // Process based on intent
    if (intent === 'product_search') {
      // Here you would call your Python scrapper API
      // For now, we'll return mock data
      products = await mockProductSearch(keywords, filters)
      response = `I found ${products.length} products matching "${keywords.join(', ')}".`
    } else if (intent === 'order_status') {
      response = "Let me check your recent orders for you."
      // Fetch user orders
    } else if (intent === 'recommendations') {
      response = "Here are some recommendations based on your preferences."
      products = await mockProductSearch(['deals', 'recommendations'], filters)
    } else {
      response = "I'm here to help you find products. Try asking me about electronics, clothing, or any specific item you're looking for!"
    }

    // Save AI response
    if (chatData) {
      await supabaseClient.from('messages').insert({
        chat_id: chatData.id,
        content: response,
        sender: 'ai',
        products: products,
        created_at: new Date().toISOString()
      })
    }

    return new Response(
      JSON.stringify({ response, products }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function extractIntent(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('order') || lowerMessage.includes('delivery') || lowerMessage.includes('track')) {
    return 'order_status'
  }
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('deals')) {
    return 'recommendations'
  }
  if (lowerMessage.includes('buy') || lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('show')) {
    return 'product_search'
  }
  return 'general'
}

function extractKeywords(message: string): string[] {
  const productKeywords = [
    'phone', 'mobile', 'smartphone', 'iphone', 'samsung', 'android',
    'laptop', 'computer', 'macbook', 'dell', 'hp', 'lenovo',
    'headphones', 'earphones', 'bluetooth', 'speaker',
    'watch', 'smartwatch', 'apple watch',
    'camera', 'dslr', 'canon', 'nikon',
    'tablet', 'ipad',
    'electronics', 'gadgets',
    'clothes', 'shirt', 'jeans', 'shoes', 'dress',
    'book', 'kindle',
    'home', 'kitchen', 'appliances'
  ]
  
  const words = message.toLowerCase().split(/\s+/)
  return words.filter(word => productKeywords.includes(word))
}

function extractFilters(message: string): any {
  const filters: any = {}
  
  // Price range extraction
  const priceMatch = message.match(/under (\d+)|below (\d+)|less than (\d+)/i)
  if (priceMatch) {
    filters.max_price = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3])
  }
  
  const minPriceMatch = message.match(/above (\d+)|over (\d+)|more than (\d+)/i)
  if (minPriceMatch) {
    filters.min_price = parseInt(minPriceMatch[1] || minPriceMatch[2] || minPriceMatch[3])
  }
  
  // Brand extraction
  const brands = ['samsung', 'apple', 'iphone', 'dell', 'hp', 'sony', 'lg', 'xiaomi', 'oneplus']
  const foundBrand = brands.find(brand => message.toLowerCase().includes(brand))
  if (foundBrand) {
    filters.brand = foundBrand
  }
  
  return filters
}

async function mockProductSearch(keywords: string[], filters: any): Promise<any[]> {
  // Mock product data - in reality, this would call your Python scrapper
  const mockProducts = [
    {
      id: '1',
      title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)',
      price: '₹1,29,999',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      link: 'https://amazon.in/samsung-galaxy-s24-ultra',
      is_amazon_choice: true
    },
    {
      id: '2',
      title: 'Apple iPhone 15 Pro (128 GB) - Natural Titanium',
      price: '₹1,34,900',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300',
      link: 'https://amazon.in/apple-iphone-15-pro',
      is_amazon_choice: false
    },
    {
      id: '3',
      title: 'Sony WH-CH720N Wireless Noise Canceling Headphones',
      price: '₹8,990',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      link: 'https://amazon.in/sony-headphones',
      is_amazon_choice: true
    }
  ]
  
  // Filter based on keywords
  if (keywords.length > 0) {
    return mockProducts.filter(product => 
      keywords.some(keyword => 
        product.title.toLowerCase().includes(keyword.toLowerCase())
      )
    ).slice(0, 3)
  }
  
  return mockProducts.slice(0, 3)
}
