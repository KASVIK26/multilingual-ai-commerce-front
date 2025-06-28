import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExtractedFeatures {
  intent: string;
  entities: {
    category?: string;
    brand?: string;
    price_range?: {
      min?: number;
      max?: number;
    };
    keywords?: string[];
  };
  confidence: number;
}

interface HuggingFaceResponse {
  intent: string;
  entities: any[];
  confidence: number;
}

// HuggingFace API interaction
async function extractFeaturesWithHuggingFace(message: string): Promise<ExtractedFeatures> {
  const huggingFaceApiKey = Deno.env.get('HUGGINGFACE_API_KEY');
  
  if (!huggingFaceApiKey) {
    console.log('⚠️ HuggingFace API key not found, using fallback extraction');
    return extractFeaturesWithFallback(message);
  }

  try {
    console.log('🤖 Using HuggingFace for feature extraction...');
    
    // Use HuggingFace NER model for entity extraction
    const nerResponse = await fetch(
      'https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${huggingFaceApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message,
        }),
      }
    );

    let entities: any[] = [];
    if (nerResponse.ok) {
      entities = await nerResponse.json();
      console.log('🎯 HuggingFace NER entities:', entities);
    }

    // Extract features from the message and NER results
    const extracted = extractFeaturesFromText(message, entities);
    
    return {
      intent: extracted.intent,
      entities: extracted.entities,
      confidence: 0.85 // High confidence for HuggingFace results
    };

  } catch (error) {
    console.error('❌ HuggingFace API error:', error);
    return extractFeaturesWithFallback(message);
  }
}

// Fallback feature extraction using local patterns
function extractFeaturesWithFallback(message: string): ExtractedFeatures {
  console.log('🔄 Using fallback feature extraction...');
  
  const lowerMessage = message.toLowerCase();
  
  // Determine intent
  let intent = 'search_products';
  if (lowerMessage.includes('compare') || lowerMessage.includes('vs')) {
    intent = 'compare_products';
  } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    intent = 'recommend_products';
  }

  // Extract entities
  const entities: any = {};
  
  // Category extraction
  const categories = ['smartphone', 'phone', 'mobile', 'laptop', 'tablet', 'headphone', 'earphone', 'watch', 'camera'];
  for (const category of categories) {
    if (lowerMessage.includes(category)) {
      entities.category = category;
      break;
    }
  }

  // Brand extraction
  const brands = ['samsung', 'apple', 'iphone', 'oneplus', 'xiaomi', 'redmi', 'oppo', 'vivo', 'realme', 'nokia', 'motorola'];
  for (const brand of brands) {
    if (lowerMessage.includes(brand)) {
      entities.brand = brand;
      break;
    }
  }

  // Price extraction
  const priceMatch = lowerMessage.match(/under\s+(\d+)|below\s+(\d+)|less\s+than\s+(\d+)|(\d+)\s*rs|₹\s*(\d+)/i);
  if (priceMatch) {
    const price = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3] || priceMatch[4] || priceMatch[5]);
    entities.price_range = { max: price };
  }

  // Keywords extraction
  const words = lowerMessage.split(/\s+/).filter(word => 
    word.length > 2 && 
    !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'run', 'she', 'too', 'use'].includes(word)
  );
  entities.keywords = words.slice(0, 5); // Limit to 5 keywords

  return {
    intent,
    entities,
    confidence: 0.7 // Medium confidence for fallback
  };
}

// Enhanced feature extraction from text and NER entities
function extractFeaturesFromText(message: string, nerEntities: any[]): { intent: string; entities: any } {
  const lowerMessage = message.toLowerCase();
  
  // Determine intent
  let intent = 'search_products';
  if (lowerMessage.includes('compare') || lowerMessage.includes('vs')) {
    intent = 'compare_products';
  } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    intent = 'recommend_products';
  }

  const entities: any = {};
  
  // Extract from NER entities (if available)
  if (nerEntities && Array.isArray(nerEntities)) {
    for (const entity of nerEntities) {
      if (entity.entity_group === 'MISC' || entity.entity_group === 'ORG') {
        // Could be a brand or product category
        const word = entity.word.toLowerCase();
        const brands = ['samsung', 'apple', 'oneplus', 'xiaomi', 'redmi', 'oppo', 'vivo'];
        if (brands.some(brand => word.includes(brand))) {
          entities.brand = word;
        }
      }
    }
  }

  // Category extraction (enhanced)
  const categoryPatterns = [
    { keywords: ['smartphone', 'phone', 'mobile'], category: 'smartphone' },
    { keywords: ['laptop', 'notebook'], category: 'laptop' },
    { keywords: ['tablet', 'ipad'], category: 'tablet' },
    { keywords: ['headphone', 'earphone', 'earbuds'], category: 'headphones' },
    { keywords: ['watch', 'smartwatch'], category: 'watch' },
    { keywords: ['camera', 'dslr'], category: 'camera' }
  ];

  for (const pattern of categoryPatterns) {
    if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
      entities.category = pattern.category;
      break;
    }
  }

  // Brand extraction (enhanced)
  const brandPatterns = ['samsung', 'apple', 'iphone', 'oneplus', 'xiaomi', 'redmi', 'oppo', 'vivo', 'realme', 'nokia', 'motorola', 'huawei', 'honor'];
  for (const brand of brandPatterns) {
    if (lowerMessage.includes(brand)) {
      entities.brand = brand;
      break;
    }
  }

  // Price extraction (enhanced)
  const pricePatterns = [
    /under\s+(\d+)/i,
    /below\s+(\d+)/i,
    /less\s+than\s+(\d+)/i,
    /(\d+)\s*rs/i,
    /₹\s*(\d+)/i,
    /budget\s+(\d+)/i,
    /within\s+(\d+)/i
  ];

  for (const pattern of pricePatterns) {
    const match = lowerMessage.match(pattern);
    if (match) {
      const price = parseInt(match[1]);
      entities.price_range = { max: price };
      break;
    }
  }

  // Range extraction
  const rangeMatch = lowerMessage.match(/(\d+)\s*(?:to|-)\s*(\d+)/i);
  if (rangeMatch) {
    entities.price_range = {
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2])
    };
  }

  // Keywords extraction
  const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'show', 'find', 'want', 'need', 'looking', 'search'];
  const words = lowerMessage.split(/\s+/).filter(word => 
    word.length > 2 && 
    !stopWords.includes(word) &&
    !/^\d+$/.test(word) // Exclude pure numbers
  );
  entities.keywords = [...new Set(words)].slice(0, 5); // Remove duplicates and limit

  return { intent, entities };
}

// Generate AI response based on extracted features
function generateAIResponse(extractedFeatures: ExtractedFeatures, productsFound: number): string {
  const { intent, entities } = extractedFeatures;
  
  let response = "";
  
  if (intent === 'search_products') {
    response = "I found ";
    
    if (productsFound === 0) {
      response = "I couldn't find any products matching your criteria. ";
      if (entities.brand && entities.category) {
        response += `You were looking for ${entities.brand} ${entities.category}s`;
      } else if (entities.category) {
        response += `You were looking for ${entities.category}s`;
      } else if (entities.brand) {
        response += `You were looking for ${entities.brand} products`;
      }
      
      if (entities.price_range?.max) {
        response += ` under ₹${entities.price_range.max}`;
      }
      
      response += ". Try adjusting your search criteria or check back later for new products.";
    } else {
      response += `${productsFound} product${productsFound > 1 ? 's' : ''} `;
      
      if (entities.brand && entities.category) {
        response += `for ${entities.brand} ${entities.category}s`;
      } else if (entities.category) {
        response += `in the ${entities.category} category`;
      } else if (entities.brand) {
        response += `from ${entities.brand}`;
      } else {
        response += "matching your search";
      }
      
      if (entities.price_range?.max) {
        response += ` under ₹${entities.price_range.max}`;
      }
      
      response += ". Here are the best options:";
    }
  } else if (intent === 'compare_products') {
    response = `I found ${productsFound} products for comparison. Here are the options to help you make the best choice:`;
  } else if (intent === 'recommend_products') {
    response = `Based on your preferences, I recommend these ${productsFound} products:`;
  }
  
  return response;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, user_id, chat_id } = await req.json()

    if (!message || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Message and user_id are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('📨 Processing chat message:', { message, user_id, chat_id });

    // Initialize Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Step 1: Extract features using HuggingFace AI
    const extractedFeatures = await extractFeaturesWithHuggingFace(message);
    console.log('🎯 Extracted features:', extractedFeatures);

    // Step 2: Create or use existing chat
    let finalChatId = chat_id;
    
    if (!finalChatId) {
      const { data: newChat, error: chatError } = await supabase
        .from('chats')
        .insert({
          user_id: user_id,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (chatError) {
        console.error('❌ Error creating chat:', chatError);
        throw chatError;
      }

      finalChatId = newChat.id;
      console.log('✅ Created new chat:', finalChatId);
    }

    // Step 3: Save user message
    const { error: userMessageError } = await supabase
      .from('messages')
      .insert({
        chat_id: finalChatId,
        content: message,
        role: 'user',
        metadata: { extracted_features: extractedFeatures },
        created_at: new Date().toISOString()
      });

    if (userMessageError) {
      console.error('❌ Error saving user message:', userMessageError);
    }

    // Step 4: Call scrape-products function to get products
    console.log('🔍 Calling scrape-products function...');
    
    const { data: scrapeData, error: scrapeError } = await supabase.functions.invoke('scrape-products', {
      body: {
        query: message,
        extracted_features: extractedFeatures,
        user_id: user_id,
        chat_id: finalChatId
      }
    });

    let products = [];
    if (scrapeError) {
      console.error('❌ Error calling scrape-products:', scrapeError);
    } else if (scrapeData?.products) {
      products = scrapeData.products;
      console.log(`✅ Found ${products.length} products`);
    }

    // Step 5: Generate AI response
    const aiResponse = generateAIResponse(extractedFeatures, products.length);

    // Step 6: Save AI message
    const { error: aiMessageError } = await supabase
      .from('messages')
      .insert({
        chat_id: finalChatId,
        content: aiResponse,
        role: 'assistant',
        metadata: { 
          extracted_features: extractedFeatures,
          products: products,
          product_count: products.length
        },
        created_at: new Date().toISOString()
      });

    if (aiMessageError) {
      console.error('❌ Error saving AI message:', aiMessageError);
    }

    // Step 7: Return response
    const response = {
      chat_id: finalChatId,
      response: aiResponse,
      extracted_features: extractedFeatures,
      products: products,
      success: true
    };

    console.log('✅ Chat processing completed successfully');

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ Error in process-chat function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        success: false
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
