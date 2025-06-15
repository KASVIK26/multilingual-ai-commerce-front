import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// More realistic user agents with recent versions
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15"
]

interface ScrapingParams {
  keywords: string
  category?: string
  min_price?: number
  max_price?: number
  brand?: string
  site?: 'amazon' | 'flipkart'
}

interface Product {
  id: string
  title: string
  price: string
  image: string
  link: string
  is_amazon_choice: boolean
  relevance_score: number
  match_reasons: string[]
  rating?: string
  review_count?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { keywords, category, min_price, max_price, brand, site = 'amazon' } = await req.json() as ScrapingParams

    console.log('🚀 Final enhanced scraping attempt:', { keywords, category, min_price, max_price, brand, site })

    let products: Product[] = []
    let scrapeSuccess = false
    let lastError = ''

    // Try multiple strategies with enhanced techniques
    const strategies = [
      () => scrapeWithAdvancedTechniques(keywords, { category, min_price, max_price, brand }),
      () => scrapeAlternativeApproach(keywords, { category, min_price, max_price, brand }),
      () => scrapeMobileVersion(keywords, { category, min_price, max_price, brand })
    ]

    for (let i = 0; i < strategies.length; i++) {
      try {
        console.log(`Trying strategy ${i + 1}...`)
        products = await strategies[i]()
        if (products.length > 0) {
          scrapeSuccess = true
          console.log(`✅ Strategy ${i + 1} succeeded with ${products.length} products`)
          break
        }
      } catch (error) {
        lastError = error.message
        console.log(`Strategy ${i + 1} failed:`, error.message)
        await randomDelay(2000, 4000) // Longer delay between attempts
        continue
      }
    }

    // If all scraping failed, generate intelligent mock data
    if (!scrapeSuccess || products.length === 0) {
      console.log('🎭 All scraping strategies failed, generating intelligent mock products')
      console.log('Last error:', lastError)
      products = generateIntelligentMockProducts(keywords, { category, brand, min_price, max_price })
    }

    // Filter products by price range if specified
    if (min_price || max_price) {
      products = filterProductsByPrice(products, min_price, max_price)
    }

    console.log(`✅ Returning ${products.length} products`)

    return new Response(
      JSON.stringify({ 
        products: products.slice(0, 15),
        source: scrapeSuccess ? 'scraped' : 'intelligent_mock',
        message: scrapeSuccess ? 'Successfully scraped live data' : `Scraping failed (${lastError}), generated intelligent recommendations`,
        total_found: products.length,
        scraping_attempted: true,
        last_error: lastError
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ Error in scrape-products:', error)
    
    return new Response(
      JSON.stringify({ 
        products: [],
        source: 'error',
        error: error.message,
        scraping_attempted: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  }
})

async function scrapeWithAdvancedTechniques(keywords: string, params: any): Promise<Product[]> {
  const searchUrl = buildEnhancedSearchUrl(keywords, params)
  console.log(`📡 Advanced scraping: ${searchUrl}`)

  // Enhanced headers with more realistic browser fingerprint
  const headers = {
    'User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Referer': 'https://www.google.com/',
    'Cookie': 'session-id=' + generateSessionId() + '; ubid-main=' + generateUbidMain()
  }

  await randomDelay(1000, 3000)

  const response = await fetch(searchUrl, {
    headers,
    method: 'GET',
    signal: AbortSignal.timeout(15000) // 15 second timeout
  })

  console.log(`📊 Response status: ${response.status}`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const html = await response.text()
  console.log(`📄 HTML length: ${html.length}`)

  // Check for bot detection
  if (html.includes('Robot Check') || html.includes('captcha') || html.includes('blocked')) {
    throw new Error('Bot detection triggered')
  }

  return parseAmazonHTMLAdvanced(html, keywords, params)
}

async function scrapeAlternativeApproach(keywords: string, params: any): Promise<Product[]> {
  // Try different Amazon domains and endpoints
  const endpoints = [
    'https://amazon.in/s',
    'https://www.amazon.in/s',
    'https://m.amazon.in/s'
  ]

  for (const endpoint of endpoints) {
    try {
      const searchUrl = `${endpoint}?k=${encodeURIComponent(keywords)}&ref=sr_pg_1`
      
      const headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us',
        'Accept-Encoding': 'gzip, deflate',
        'Referer': 'https://www.google.com/'
      }

      await randomDelay(2000, 4000)

      const response = await fetch(searchUrl, { headers, signal: AbortSignal.timeout(10000) })
      
      if (response.ok) {
        const html = await response.text()
        if (!html.includes('Robot Check') && !html.includes('captcha')) {
          const products = parseAmazonHTMLAdvanced(html, keywords, params)
          if (products.length > 0) return products
        }
      }
    } catch (error) {
      console.log(`Alternative endpoint ${endpoint} failed:`, error.message)
      continue
    }
  }

  throw new Error('All alternative endpoints failed')
}

async function scrapeMobileVersion(keywords: string, params: any): Promise<Product[]> {
  const searchUrl = `https://m.amazon.in/s?k=${encodeURIComponent(keywords)}&c=ts`
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  }

  await randomDelay(1500, 3000)

  const response = await fetch(searchUrl, { headers, signal: AbortSignal.timeout(12000) })
  
  if (!response.ok) {
    throw new Error(`Mobile scraping failed: ${response.status}`)
  }

  const html = await response.text()
  return parseAmazonHTMLAdvanced(html, keywords, params)
}

function buildEnhancedSearchUrl(keywords: string, params: any): string {
  let searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(keywords)}&ref=sr_pg_1`
  
  // Add category filter
  if (params.category) {
    const categoryMappings = {
      'electronics': '&rh=n%3A976419031',
      'clothing': '&rh=n%3A1571271031',
      'home': '&rh=n%3A976442031',
      'books': '&rh=n%3A976389031',
      'sports': '&rh=n%3A3677697031'
    }
    searchUrl += categoryMappings[params.category] || ''
  }

  // Add price filter
  if (params.min_price || params.max_price) {
    const min = (params.min_price || 0) * 100
    const max = (params.max_price || 999999) * 100
    searchUrl += `&rh=p_36%3A${min}-${max}`
  }

  // Add sorting for relevance
  searchUrl += '&s=relevancerank'

  return searchUrl
}

function parseAmazonHTMLAdvanced(html: string, keywords: string, params: any): Product[] {
  const products: Product[] = []
  
  try {
    console.log(`🔍 Parsing HTML for products...`)
    
    // Enhanced patterns for different Amazon layouts
    const productPatterns = [
      // Pattern 1: Standard search results
      {
        container: /data-component-type="s-search-result"[^>]*data-asin="([^"]+)"[^>]*>([\s\S]*?)(?=data-component-type="s-search-result"|data-testid="puis-expand-collapse-button"|$)/g,
        title: /<h2[^>]*class="[^"]*s-size-mini[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/,
        price: /₹[\s]*([0-9,]+)/,
        image: /<img[^>]+src="([^"]+)"/,
        rating: /aria-label="([0-9.]+) out of 5 stars"/,
        reviews: /<span[^>]*aria-label="([0-9,]+)[^"]*"[^>]*>/
      },
      // Pattern 2: Grid layout
      {
        container: /<div[^>]+data-asin="([^"]+)"[^>]*class="[^"]*s-result-item[^"]*"[^>]*>([\s\S]*?)(?=<div[^>]+data-asin="|$)/g,
        title: /<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/,
        price: /<span[^>]*class="[^"]*a-price-whole[^"]*"[^>]*>([^<]+)<\/span>/,
        image: /<img[^>]+src="([^"]+)"/,
        rating: /([0-9.]+) out of 5/,
        reviews: />([0-9,]+)</
      },
      // Pattern 3: Mobile layout
      {
        container: /<div[^>]*data-asin="([^"]+)"[^>]*>([\s\S]*?)(?=<div[^>]*data-asin="|<footer|$)/g,
        title: /<h2[^>]*>([^<]+)<\/h2>/,
        price: /₹([0-9,]+)/,
        image: /<img[^>]+src="([^"]+)"/,
        rating: /([0-9.]+) stars/,
        reviews: /\(([0-9,]+)\)/
      }
    ]

    for (const pattern of productPatterns) {
      let containerMatch
      pattern.container.lastIndex = 0
      
      while ((containerMatch = pattern.container.exec(html)) !== null && products.length < 20) {
        const asin = containerMatch[1]
        const containerHtml = containerMatch[2] || containerMatch[0]
        
        const titleMatch = containerHtml.match(pattern.title)
        const priceMatch = containerHtml.match(pattern.price)
        
        if (asin && titleMatch && priceMatch) {
          const title = titleMatch[1]?.trim()
          const priceText = priceMatch[1]?.replace(/[,\s]/g, '')
          
          if (title && priceText && isValidProduct(title, keywords)) {
            const imageMatch = containerHtml.match(pattern.image)
            const ratingMatch = containerHtml.match(pattern.rating)
            const reviewsMatch = containerHtml.match(pattern.reviews)
            
            const product: Product = {
              id: asin,
              title: cleanTitle(title),
              price: `₹${priceText}`,
              image: cleanImageUrl(imageMatch?.[1]) || getPlaceholderImage(keywords),
              link: `https://www.amazon.in/dp/${asin}`,
              is_amazon_choice: containerHtml.includes("Amazon's Choice") || containerHtml.includes("amazon-choice"),
              relevance_score: calculateRelevance(title, keywords, params),
              match_reasons: getMatchReasons(title, keywords, params),
              rating: ratingMatch?.[1] || undefined,
              review_count: reviewsMatch?.[1] || undefined
            }
            
            products.push(product)
            console.log(`Found product: ${title.substring(0, 50)}...`)
          }
        }
      }
      
      if (products.length > 0) {
        console.log(`✅ Found ${products.length} products with pattern`)
        break
      }
    }

    return products.slice(0, 15)

  } catch (error) {
    console.error('❌ Error parsing Amazon HTML:', error)
    return []
  }
}

function isValidProduct(title: string, keywords: string): boolean {
  const titleLower = title.toLowerCase()
  const keywordsLower = keywords.toLowerCase()
  
  // Skip invalid or promotional content
  const skipPatterns = [
    'sponsored', 'advertisement', 'ad ', 'deals of the day', 
    'today\'s deals', 'see more', 'related searches',
    'customers who viewed', 'frequently bought together'
  ]
  
  if (skipPatterns.some(pattern => titleLower.includes(pattern))) {
    return false
  }
  
  // Must contain relevant keywords
  const keywordWords = keywordsLower.split(' ').filter(word => word.length > 2)
  return keywordWords.some(word => titleLower.includes(word))
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s+/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function cleanImageUrl(url?: string): string {
  if (!url) return ''
  
  if (url.startsWith('//')) {
    return 'https:' + url
  } else if (url.startsWith('/')) {
    return 'https://www.amazon.in' + url
  }
  
  // Remove loading placeholders
  if (url.includes('placeholder') || url.includes('loading') || url.includes('blank')) {
    return ''
  }
  
  return url
}

function getPlaceholderImage(keywords: string): string {
  const keywordsLower = keywords.toLowerCase()
  
  if (keywordsLower.includes('iphone') || keywordsLower.includes('apple')) {
    return 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop'
  } else if (keywordsLower.includes('samsung')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop'
  } else if (keywordsLower.includes('laptop')) {
    return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop'
  } else if (keywordsLower.includes('headphone')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
  }
  
  return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'
}

function generateIntelligentMockProducts(keywords: string, params: any): Product[] {
  console.log('🎭 Generating intelligent mock products for:', keywords)
  
  const lowerKeywords = keywords.toLowerCase()
  const products: Product[] = []
  
  // Detect product type and generate realistic products
  let productType = 'smartphone'
  let targetBrand = params.brand || ''
  
  if (lowerKeywords.includes('iphone') || lowerKeywords.includes('apple')) {
    productType = 'iphone'
    targetBrand = 'Apple'
  } else if (lowerKeywords.includes('samsung')) {
    productType = 'samsung'
    targetBrand = 'Samsung'
  } else if (lowerKeywords.includes('laptop')) {
    productType = 'laptop'
  } else if (lowerKeywords.includes('headphone') || lowerKeywords.includes('earphone')) {
    productType = 'headphones'
  }

  const productData = getRealisticProductData(productType, targetBrand)
  const basePrice = getBasePriceForType(productType)
  
  let priceMin = params.min_price || Math.floor(basePrice * 0.3)
  let priceMax = params.max_price || Math.floor(basePrice * 2)
  
  productData.forEach((product, index) => {
    const priceVariation = (Math.random() - 0.5) * 0.6 // ±30% variation
    let finalPrice = Math.floor(basePrice + (basePrice * priceVariation))
    
    finalPrice = Math.max(priceMin, Math.min(priceMax, finalPrice))
    
    products.push({
      id: `mock_${Date.now()}_${index}`,
      title: product.title,
      price: `₹${finalPrice.toLocaleString('en-IN')}`,
      image: getPlaceholderImage(keywords),
      link: `https://amazon.in/dp/mock-${index}`,
      is_amazon_choice: index < 2,
      relevance_score: Math.max(0.7, 1.0 - (index * 0.05)),
      match_reasons: ['ai_recommended', 'category_match', 'price_optimized'],
      rating: (3.8 + Math.random() * 1.2).toFixed(1),
      review_count: (Math.floor(Math.random() * 8000) + 500).toLocaleString()
    })
  })
  
  return products.slice(0, 12)
}

function generateSessionId(): string {
  return Array.from({length: 20}, () => Math.random().toString(36)[2]).join('')
}

function generateUbidMain(): string {
  return Array.from({length: 40}, () => Math.random().toString(36)[2]).join('')
}

function getRealisticProductData(productType: string, brand?: string): Array<{title: string}> {
  const data = {
    iphone: [
      { title: 'Apple iPhone 15 (128GB) - Natural Titanium' },
      { title: 'Apple iPhone 15 Plus (256GB) - Blue' },
      { title: 'Apple iPhone 14 (128GB) - Midnight' },
      { title: 'Apple iPhone 14 Plus (256GB) - Purple' },
      { title: 'Apple iPhone 13 (128GB) - Pink' },
      { title: 'Apple iPhone 13 mini (256GB) - Starlight' },
      { title: 'Apple iPhone 15 Pro (256GB) - Natural Titanium' },
      { title: 'Apple iPhone 14 Pro (128GB) - Deep Purple' },
      { title: 'Apple iPhone 13 Pro Max (512GB) - Sierra Blue' },
      { title: 'Apple iPhone 12 (64GB) - Black' },
      { title: 'Apple iPhone SE (3rd generation) (128GB) - Red' },
      { title: 'Apple iPhone 15 Pro Max (1TB) - Blue Titanium' }
    ],
    samsung: [
      { title: 'Samsung Galaxy S24 Ultra (256GB) - Titanium Gray' },
      { title: 'Samsung Galaxy S24+ (512GB) - Onyx Black' },
      { title: 'Samsung Galaxy S24 (128GB) - Marble Gray' },
      { title: 'Samsung Galaxy A55 5G (128GB) - Awesome Iceblue' },
      { title: 'Samsung Galaxy A35 5G (256GB) - Awesome Lilac' },
      { title: 'Samsung Galaxy M55 5G (128GB) - Light Green' },
      { title: 'Samsung Galaxy F55 5G (256GB) - Apricot Crush' },
      { title: 'Samsung Galaxy A25 5G (128GB) - Blue Black' },
      { title: 'Samsung Galaxy M35 5G (128GB) - Thunder Gray' },
      { title: 'Samsung Galaxy A15 5G (128GB) - Light Blue' },
      { title: 'Samsung Galaxy S23 FE (256GB) - Mint' },
      { title: 'Samsung Galaxy A54 5G (128GB) - Awesome Violet' }
    ],
    laptop: [
      { title: 'MacBook Air 13-inch (M2, 256GB SSD) - Midnight' },
      { title: 'MacBook Pro 14-inch (M3, 512GB SSD) - Space Gray' },
      { title: 'Dell XPS 13 Plus (11th Gen Intel i7, 512GB SSD)' },
      { title: 'HP Spectre x360 14 (Intel i7, 1TB SSD) - Natural Silver' },
      { title: 'Lenovo ThinkPad X1 Carbon (11th Gen, 256GB SSD)' },
      { title: 'ASUS ZenBook 14 OLED (AMD Ryzen 7, 512GB SSD)' },
      { title: 'Microsoft Surface Laptop 5 (Intel i5, 256GB SSD)' },
      { title: 'Acer Swift X (AMD Ryzen 7, 512GB SSD) - Steam Blue' }
    ],
    headphones: [
      { title: 'Apple AirPods Pro (2nd Generation) with MagSafe Case' },
      { title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones' },
      { title: 'Bose QuietComfort 45 Wireless Bluetooth Headphones' },
      { title: 'Apple AirPods Max - Sky Blue' },
      { title: 'Sennheiser Momentum 4 Wireless Headphones' },
      { title: 'JBL Live 660NC Wireless Over-Ear Headphones' },
      { title: 'Audio-Technica ATH-M50xBT2 Wireless Headphones' },
      { title: 'Skullcandy Crusher Evo Wireless Over-Ear Headphones' }
    ]
  }
  
  return data[productType as keyof typeof data] || data.samsung
}

function getBasePriceForType(productType: string): number {
  const prices = {
    iphone: 65000,
    samsung: 25000,
    laptop: 60000,
    headphones: 8000,
    smartphone: 20000
  }
  
  return prices[productType as keyof typeof prices] || prices.smartphone
}

function filterProductsByPrice(products: Product[], minPrice?: number, maxPrice?: number): Product[] {
  if (!minPrice && !maxPrice) return products
  
  return products.filter(product => {
    const price = parseInt(product.price.replace(/[₹,]/g, ''))
    
    if (minPrice && price < minPrice) return false
    if (maxPrice && price > maxPrice) return false
    
    return true
  })
}

function calculateRelevance(title: string, keywords: string, params: any): number {
  let score = 0.5
  const titleLower = title.toLowerCase()
  const keywordsLower = keywords.toLowerCase()

  // Keyword matching
  const keywordWords = keywordsLower.split(' ').filter(word => word.length > 2)
  for (const word of keywordWords) {
    if (titleLower.includes(word)) {
      score += 0.15
    }
  }

  // Brand matching
  if (params.brand && titleLower.includes(params.brand.toLowerCase())) {
    score += 0.25
  }

  return Math.min(score, 1.0)
}

function getMatchReasons(title: string, keywords: string, params: any): string[] {
  const reasons: string[] = []
  const titleLower = title.toLowerCase()

  if (titleLower.includes(keywords.toLowerCase())) {
    reasons.push('keyword_match')
  }

  if (params.brand && titleLower.includes(params.brand.toLowerCase())) {
    reasons.push('brand_match')
  }

  if (params.category) {
    reasons.push('category_match')
  }

  reasons.push('ai_recommended')
  return reasons
}

async function randomDelay(min: number, max: number): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  await new Promise(resolve => setTimeout(resolve, delay))
}
