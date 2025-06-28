/// <reference types="https://deno.land/x/types/index.d.ts" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Product interface for type safety
interface Product {
  id: string;
  title: string;
  description: string;
  specs: string[];
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
  rating: string;
  review_count: string;
  relevance_score?: number;
  match_reasons?: string[];
}

// API configuration
interface ApiConfig {
  rapidapi_key?: string;
  amazon_api_key?: string;
  ebay_api_key?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    const requestBody = await req.json();
    console.log('📨 Received request body:', requestBody);
    
    // Handle both old format (direct keywords) and new format (from process-chat)
    let keywords: string, category: string | undefined, min_price: number | undefined, max_price: number | undefined, brand: string | undefined;
    
    if (requestBody.extracted_features) {
      // New format from process-chat function
      const { query, extracted_features } = requestBody;
      keywords = query || 'products';
      const entities = extracted_features.entities || {};
      
      category = entities.category;
      brand = entities.brand;
      min_price = entities.price_range?.min;
      max_price = entities.price_range?.max;
      
      console.log('🔄 Converted extracted features to parameters');
    } else {
      // Old format (direct parameters)
      ({ keywords, category, min_price, max_price, brand } = requestBody);
      keywords = keywords || 'products';
    }
    
    console.log('🚀 Processing request with:', {
      keywords,
      category,
      min_price,
      max_price,
      brand
    });

    let products: Product[] = [];
    let source = 'intelligent_mock';
    let message = '';
    let lastError = '';

    // Try only reliable Amazon APIs
    const apiStrategies = [
      () => tryRapidApiAmazon(keywords, { category, min_price, max_price, brand })
    ];

    for (let i = 0; i < apiStrategies.length; i++) {
      try {
        console.log(`🔄 Trying API strategy ${i + 1}...`);
        const result = await apiStrategies[i]();
        if (result.products.length > 0) {
          products = result.products;
          source = result.source;
          message = result.message;
          console.log(`✅ API strategy ${i + 1} succeeded with ${products.length} products`);
          break;
        }
      } catch (error) {
        lastError = error.message;
        console.log(`❌ API strategy ${i + 1} failed:`, error.message);
        continue;
      }
    }

    // If all APIs failed, generate intelligent mock data
    if (products.length === 0) {
      console.log('🎭 All APIs failed, generating intelligent mock products');
      products = generateIntelligentMockProducts(keywords, {
        category,
        brand,
        min_price,
        max_price
      });
      source = 'intelligent_mock';
      message = `APIs unavailable (${lastError}), generated AI recommendations`;
    }

    // Filter products by price range if specified
    if (min_price || max_price) {
      products = filterProductsByPrice(products, min_price, max_price);
    }

    // Save products to database and get updated products with database IDs
    if (products.length > 0) {
      try {
        products = await saveProductsToDatabase(products);
        console.log(`✅ Saved ${products.length} products to database`);
      } catch (error) {
        console.error('❌ Error saving products to database:', error);
        // Continue anyway - don't fail the request if database save fails
      }
    }

    console.log(`✅ Returning ${products.length} products from ${source}`);
    
    return new Response(JSON.stringify({
      products: products.slice(0, 15),
      source,
      message,
      total_found: products.length,
      api_attempted: true,
      last_error: lastError
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });

  } catch (error) {
    console.error('❌ Error in scrape-products:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error.message,
      products: [],
      source: 'error',
      message: 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});

// Try RapidAPI Real-Time Amazon Data API (Most Reliable)
async function tryRapidApiAmazon(keywords: string, params: any): Promise<{products: Product[], source: string, message: string}> {
  console.log('🔍 Attempting RapidAPI Amazon Data...');
  
  const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
  if (!rapidApiKey) {
    throw new Error('RapidAPI key not configured');
  }
  
  try {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(keywords)}&page=1&country=IN&sort_by=RELEVANCE&product_condition=ALL`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`RapidAPI request failed: ${response.status}`);
    }

    const data = await response.json();
    const products: Product[] = [];

    if (data.data && data.data.products) {
      for (let i = 0; i < Math.min(data.data.products.length, 15); i++) {
        const item = data.data.products[i];
        
        products.push({
          id: item.asin || `rapid_${i}`,
          title: item.product_title || 'Amazon Product',
          description: item.product_description || 'High-quality product from Amazon India',
          specs: item.product_details ? Object.values(item.product_details).slice(0, 5) as string[] : [],
          price: item.product_price || '₹0',
          image: item.product_photo || getPlaceholderImage(keywords),
          link: item.product_url || `https://amazon.in/dp/${item.asin}`,
          is_amazon_choice: item.is_best_seller || item.is_amazon_choice || false,
          rating: item.product_star_rating || '4.0',
          review_count: item.product_num_ratings?.toString() || '0',
          relevance_score: 0.9 - (i * 0.05),
          match_reasons: ['amazon_official', 'live_data', 'rapid_api']
        });
      }
    }

    return {
      products,
      source: 'amazon_rapidapi',
      message: `Found ${products.length} live products from Amazon India`
    };

  } catch (error) {
    console.error('RapidAPI Amazon error:', error);
    throw new Error(`Amazon API failed: ${error.message}`);
  }
}

// Enhanced intelligent mock product generation
function generateIntelligentMockProducts(keywords: string, params: any): Product[] {
  console.log('🎭 Generating intelligent mock products for:', keywords);
  
  if (!keywords || typeof keywords !== 'string') {
    keywords = 'products';
  }
  
  const lowerKeywords = keywords.toLowerCase();
  const products: Product[] = [];
  
  // Detect product type and generate realistic products
  let productType = 'smartphone';
  let targetBrand = params?.brand || '';
  
  if (lowerKeywords.includes('iphone') || lowerKeywords.includes('apple')) {
    productType = 'iphone';
    targetBrand = 'Apple';
  } else if (lowerKeywords.includes('samsung')) {
    productType = 'samsung';
    targetBrand = 'Samsung';
  } else if (lowerKeywords.includes('laptop') || lowerKeywords.includes('computer')) {
    productType = 'laptop';
  } else if (lowerKeywords.includes('headphone') || lowerKeywords.includes('earphone') || lowerKeywords.includes('airpods')) {
    productType = 'headphones';
  } else if (lowerKeywords.includes('watch') || lowerKeywords.includes('smartwatch')) {
    productType = 'smartwatch';
  } else if (lowerKeywords.includes('tablet') || lowerKeywords.includes('ipad')) {
    productType = 'tablet';
  }

  const productData = getRealisticProductData(productType, targetBrand);
  const basePrice = getBasePriceForType(productType);
  const priceMin = params?.min_price || Math.floor(basePrice * 0.3);
  const priceMax = params?.max_price || Math.floor(basePrice * 2);

  productData.forEach((product, index) => {
    const priceVariation = (Math.random() - 0.5) * 0.6; // ±30% variation
    let finalPrice = Math.floor(basePrice + (basePrice * priceVariation));
    finalPrice = Math.max(priceMin, Math.min(priceMax, finalPrice));

    products.push({
      id: `ai_${Date.now()}_${index}`,
      title: product.title,
      description: product.description || 'High-quality product with premium features and modern design',
      specs: product.specs || [],
      price: `₹${finalPrice.toLocaleString('en-IN')}`,
      image: product.image || getPlaceholderImage(keywords),
      link: product.url || `https://amazon.in/dp/ai-${index}`,
      is_amazon_choice: index < 2,
      relevance_score: Math.max(0.7, 1.0 - (index * 0.05)),
      match_reasons: ['ai_recommended', 'category_match', 'price_optimized'],
      rating: (3.8 + Math.random() * 1.2).toFixed(1),
      review_count: (Math.floor(Math.random() * 8000) + 500).toLocaleString()
    });
  });

  return products.slice(0, 12);
}

function getRealisticProductData(productType: string, brand: string) {
  const data: { [key: string]: any[] } = {
    iphone: [
      {
        title: 'Apple iPhone 15 Pro (128GB) - Natural Titanium',
        description: 'Dynamic Island, 48MP Main camera, USB-C, Action button, A17 Pro chip',
        specs: ['6.1" Super Retina XDR display', 'A17 Pro chip', '48MP Camera System', 'USB-C connector', 'Action Button'],
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CHX1W1XY'
      },
      {
        title: 'Apple iPhone 15 Plus (256GB) - Blue',
        description: 'Larger 6.7" display with Dynamic Island and advanced camera system',
        specs: ['6.7" Super Retina XDR display', 'A16 Bionic chip', '48MP Camera System', 'All-day battery life'],
        image: 'https://images.unsplash.com/photo-1611791484658-350aafc33a23?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CHX2RDGX'
      },
      {
        title: 'Apple iPhone 14 (128GB) - Midnight',
        description: 'Advanced dual-camera system, Crash Detection, All-day battery life',
        specs: ['6.1" Super Retina XDR display', 'A15 Bionic chip', 'Dual 12MP camera system', 'Face ID'],
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0BDJ7W8V3'
      }
    ],
    samsung: [
      {
        title: 'Samsung Galaxy S24 Ultra (256GB) - Titanium Gray',
        description: 'Built-in S Pen, Pro-grade Camera with AI features, 200MP camera system',
        specs: ['6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '200MP Camera', 'S Pen included', 'AI Photo Editor'],
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CTKGVKZK'
      },
      {
        title: 'Samsung Galaxy S24+ (512GB) - Onyx Black',
        description: 'Enhanced performance, Advanced AI capabilities, Premium aluminum design',
        specs: ['6.7" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '50MP Triple Camera', '4900mAh battery'],
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CTKFXK4Q'
      },
      {
        title: 'Samsung Galaxy A54 5G (128GB) - Awesome Violet',
        description: 'Premium design with great camera performance and 5G connectivity',
        specs: ['6.4" Super AMOLED', 'Exynos 1380', '50MP OIS Camera', '5000mAh battery'],
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0BZS1G7NK'
      }
    ],
    smartphone: [
      {
        title: 'OnePlus 12 (256GB) - Flowy Emerald',
        description: 'Hasselblad Camera for Mobile, 120Hz ProXDR Display, 100W SUPERVOOC charging',
        specs: ['6.82" ProXDR Display', 'Snapdragon 8 Gen 3', 'Hasselblad Camera', '100W SuperVOOC'],
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CS5Z6DXP'
      },
      {
        title: 'Google Pixel 8 (128GB) - Obsidian',
        description: 'Google AI features, Best-in-class camera, 7 years of security updates',
        specs: ['6.2" Actua display', 'Google Tensor G3', 'Advanced AI features', 'Titan M security'],
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CGT7JBPN'
      },
      {
        title: 'Nothing Phone (2a) (256GB) - Black',
        description: 'Unique transparent design, Glyph Interface, Pure Android experience',
        specs: ['6.7" AMOLED Display', 'MediaTek Dimensity 7200 Pro', 'Glyph Interface', '5000mAh battery'],
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CQFR2X4L'
      }
    ],
    laptop: [
      {
        title: 'MacBook Air 13" M3 (256GB) - Midnight',
        description: 'Apple M3 chip, All-day battery life, Liquid Retina display, Silent fanless design',
        specs: ['13.6" Liquid Retina display', 'Apple M3 chip', '18-hour battery', '256GB SSD', 'Fanless design'],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CWG6XJNM'
      },
      {
        title: 'Dell XPS 13 Plus (512GB) - Platinum Silver',
        description: 'Intel Core i7, InfinityEdge display, Premium build quality, Modern design',
        specs: ['13.4" InfinityEdge display', 'Intel Core i7-1360P', '16GB RAM', '512GB SSD'],
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B08YKG5K7F'
      },
      {
        title: 'ASUS ZenBook 14 OLED (1TB) - Jade Black',
        description: 'AMD Ryzen 7, Stunning OLED display, All-day battery, Ultra-portable',
        specs: ['14" OLED 2.8K display', 'AMD Ryzen 7 7730U', '16GB RAM', '1TB SSD'],
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0C87QZHQZ'
      }
    ],
    headphones: [
      {
        title: 'Sony WH-1000XM5 - Black',
        description: 'Industry-leading noise canceling, 30-hour battery life, Premium sound quality',
        specs: ['30mm drivers', 'Active Noise Cancelling', '30-hour battery', 'Quick Charge', 'Multipoint Bluetooth'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B09XS7JWHH'
      },
      {
        title: 'Apple AirPods Pro (2nd generation)',
        description: 'Active Noise Cancellation, Transparency mode, Spatial Audio, MagSafe charging',
        specs: ['Active Noise Cancellation', 'Transparency mode', 'MagSafe Charging Case', 'Up to 6 hours listening'],
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0BDHB9Y8H'
      },
      {
        title: 'Bose QuietComfort 45 - White Smoke',
        description: 'World-class noise cancellation, Comfortable all-day wear, Crystal clear calls',
        specs: ['TriPort acoustic architecture', 'Quiet and Aware modes', '24-hour battery', 'Lightweight design'],
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B098FKXT8L'
      }
    ],
    smartwatch: [
      {
        title: 'Apple Watch Series 9 (45mm) - Midnight Aluminum',
        description: 'S9 chip, Double Tap gesture, Always-On Retina display, Advanced health features',
        specs: ['45mm Always-On Retina display', 'S9 SiP', 'Double Tap', 'Blood Oxygen', 'ECG'],
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0CHX8S6Z1'
      },
      {
        title: 'Samsung Galaxy Watch6 (44mm) - Graphite',
        description: 'Advanced health monitoring, Personalized coaching, Long-lasting battery',
        specs: ['44mm Super AMOLED display', 'Exynos W930', 'Body composition', 'Sleep coaching'],
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0C9KZ8P7G'
      }
    ],
    tablet: [
      {
        title: 'iPad Air (5th generation) - Blue',
        description: 'M1 chip, 10.9-inch Liquid Retina display, Compatible with Apple Pencil',
        specs: ['10.9" Liquid Retina display', 'Apple M1 chip', 'All-day battery', 'Apple Pencil support'],
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B09V3HN1KC'
      },
      {
        title: 'Samsung Galaxy Tab S9 (256GB) - Beige',
        description: 'Dynamic AMOLED 2X display, S Pen included, Premium metal design',
        specs: ['11" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 2', 'S Pen included', '8000mAh battery'],
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
        url: 'https://www.amazon.in/dp/B0C98KT4XN'
      }
    ]
  };
  
  return data[productType] || data.smartphone;
}

function getBasePriceForType(productType: string): number {
  const prices: { [key: string]: number } = {
    iphone: 75000,
    samsung: 30000,
    laptop: 65000,
    headphones: 12000,
    smartphone: 25000,
    smartwatch: 25000,
    tablet: 35000
  };
  return prices[productType] || prices.smartphone;
}

function getPlaceholderImage(keywords: string): string {
  if (!keywords || typeof keywords !== 'string') {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
  }
  
  const keywordsLower = keywords.toLowerCase();
  
  if (keywordsLower.includes('iphone') || keywordsLower.includes('apple phone')) {
    return 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop';
  } else if (keywordsLower.includes('samsung')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop';
  } else if (keywordsLower.includes('laptop') || keywordsLower.includes('computer')) {
    return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop';
  } else if (keywordsLower.includes('headphone') || keywordsLower.includes('airpods')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
  } else if (keywordsLower.includes('watch')) {
    return 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop';
  } else if (keywordsLower.includes('tablet') || keywordsLower.includes('ipad')) {
    return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop';
  }
  
  return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
}

function filterProductsByPrice(products: Product[], minPrice?: number, maxPrice?: number): Product[] {
  if (!minPrice && !maxPrice) return products;
  
  return products.filter((product) => {
    const price = parseInt(product.price.replace(/[₹,]/g, ''));
    if (minPrice && price < minPrice) return false;
    if (maxPrice && price > maxPrice) return false;
    return true;
  });
}

// Function to save products to database
async function saveProductsToDatabase(products: Product[]): Promise<Product[]> {
  const productsToInsert = [];
  const productMap = new Map<string, Product>();
  
  // Create a map of original products for easy lookup
  products.forEach(product => {
    productMap.set(product.id, product);
  });
  
  for (const product of products) {
    // Check if product already exists by checking the external ID
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('id, product_id')
      .eq('product_id', product.id)
      .single();
    
    // If no existing product found (PGRST116 is "not found" error)
    if (!existingProduct && (!checkError || checkError.code === 'PGRST116')) {
      // Parse price to number
      const priceNumber = parseFloat(product.price.replace(/[₹,]/g, '') || '0');
      
      productsToInsert.push({
        product_id: product.id, // External product ID
        name: product.title,
        description: product.description,
        price: priceNumber,
        image_url: product.image,
        product_url: product.link,
        rating: parseFloat(product.rating || '0'),
        review_count: parseInt(product.review_count?.replace(/[,]/g, '') || '0'),
        features: product.specs || [],
        platform: 'amazon',
        platform_specific_data: {
          is_amazon_choice: product.is_amazon_choice,
          relevance_score: product.relevance_score,
          match_reasons: product.match_reasons
        },
        is_active: true,
        scraped_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  }
  
  if (productsToInsert.length > 0) {
    const { data: insertedProducts, error } = await supabase
      .from('products')
      .insert(productsToInsert)
      .select('id, product_id, name, price, image_url, product_url, rating, review_count, features, platform_specific_data');
    
    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }
    
    console.log(`✅ Inserted ${productsToInsert.length} new products into database`);
    
    // Update product IDs with database UUIDs
    if (insertedProducts) {
      insertedProducts.forEach(dbProduct => {
        const originalProduct = productMap.get(dbProduct.product_id);
        if (originalProduct) {
          originalProduct.id = dbProduct.id; // Replace with database UUID
        }
      });
    }
  }
  
  // Fetch all products from database to get any existing ones with their UUIDs
  const productIds = products.map(p => p.id);
  const { data: allDbProducts } = await supabase
    .from('products')
    .select('id, product_id')
    .in('product_id', productIds);
  
  if (allDbProducts) {
    allDbProducts.forEach(dbProduct => {
      const originalProduct = productMap.get(dbProduct.product_id);
      if (originalProduct) {
        originalProduct.id = dbProduct.id; // Update with database UUID
      }
    });
  }
  
  return products;
}
