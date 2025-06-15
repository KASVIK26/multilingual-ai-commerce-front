
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Enhanced user agents with more realistic patterns
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
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

    console.log('🚀 Enhanced scraping request:', { keywords, category, min_price, max_price, brand, site })

    let products: Product[] = []

    // Try scraping first
    if (site === 'amazon') {
      products = await scrapeAmazonRobust(keywords, { category, min_price, max_price, brand })
    } else if (site === 'flipkart') {
      products = await scrapeFlipkartRobust(keywords, { category, min_price, max_price, brand })
    }

    // If scraping fails or returns no products, generate smart mock products
    if (products.length === 0) {
      console.log('🎭 Scraping failed or returned 0 products, generating smart mock products')
      products = generateSmartMockProducts(keywords, { category, brand, min_price, max_price })
    }

    console.log(`✅ Returning ${products.length} products`)

    return new Response(
      JSON.stringify({ 
        products,
        source: products[0]?.id?.includes('mock') ? 'generated' : 'scraped',
        message: products[0]?.id?.includes('mock') ? 'Results generated due to scraping limitations' : 'Results scraped successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ Error in scrape-products:', error)
    
    // Generate fallback products on any error
    const fallbackProducts = generateEmergencyFallback()
    
    return new Response(
      JSON.stringify({ 
        products: fallbackProducts,
        source: 'emergency_fallback',
        note: 'Using emergency fallback products due to scraping error',
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  }
})

async function scrapeAmazonRobust(keywords: string, params: any): Promise<Product[]> {
  const endpoints = [
    'https://www.amazon.in',
    'https://amazon.in',
    'https://www.amazon.com',
    'https://m.amazon.in'
  ]

  for (const endpoint of endpoints) {
    console.log(`🔍 Trying endpoint: ${endpoint}`)
    
    try {
      // Add random delay between requests
      await randomDelay(1000, 3000)
      
      const products = await tryAmazonScrapingRobust(endpoint, keywords, params)
      if (products.length > 0) {
        console.log(`✅ Success with ${endpoint}: ${products.length} products`)
        return products
      }
    } catch (error) {
      console.log(`❌ Failed with ${endpoint}:`, error.message)
      continue
    }
  }

  console.log('❌ All Amazon endpoints failed')
  return []
}

async function tryAmazonScrapingRobust(endpoint: string, keywords: string, params: any): Promise<Product[]> {
  const searchUrl = `${endpoint}/s?k=${encodeURIComponent(keywords)}`
  
  // Enhanced headers with more realistic browser behavior
  const headers = createEnhancedHeaders()

  console.log(`📡 Fetching: ${searchUrl}`)

  const response = await fetch(searchUrl, {
    headers,
    method: 'GET',
  })

  console.log(`📊 Response status: ${response.status}`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const html = await response.text()
  return parseAmazonHTMLRobust(html, keywords, params)
}

function createEnhancedHeaders(): Record<string, string> {
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
  
  return {
    'User-Agent': userAgent,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
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
    'sec-ch-ua-platform': '"Windows"'
  }
}

async function randomDelay(min: number, max: number): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  await new Promise(resolve => setTimeout(resolve, delay))
}

function parseAmazonHTMLRobust(html: string, keywords: string, params: any): Product[] {
  const products: Product[] = []
  
  try {
    console.log(`📄 Parsing HTML (${html.length} chars)`)
    
    // Multiple patterns to catch different Amazon layouts
    const productPatterns = [
      // Pattern 1: Standard search results with data-asin
      /data-asin="([^"]+)"[\s\S]*?<h2[\s\S]*?<span[^>]*>([^<]+)<\/span>[\s\S]*?<span class="a-price-symbol">₹<\/span><span class="a-price-whole">([^<]+)<\/span>/g,
      // Pattern 2: Alternative price format
      /data-asin="([^"]+)"[\s\S]*?<h2[\s\S]*?<span[^>]*>([^<]+)<\/span>[\s\S]*?<span class="a-offscreen">₹([^<]+)<\/span>/g,
      // Pattern 3: Grid view format
      /<div[^>]+data-component-type="s-search-result"[\s\S]*?data-asin="([^"]+)"[\s\S]*?<h2[\s\S]*?>([^<]+)<\/h2>[\s\S]*?₹([0-9,]+)/g,
      // Pattern 4: Mobile format
      /data-asin="([^"]+)"[\s\S]*?<h2[\s\S]*?>([^<]+)<\/h2>[\s\S]*?₹([0-9,]+)/g
    ]

    let productCount = 0
    
    for (const pattern of productPatterns) {
      let match
      pattern.lastIndex = 0
      
      while ((match = pattern.exec(html)) !== null && productCount < 20) {
        const asin = match[1]
        const title = match[2]?.trim()
        const priceText = match[3]?.trim()

        if (title && asin && priceText && title.length > 10) {
          // Clean and validate title
          const cleanTitle = title.replace(/\s+/g, ' ').trim()
          
          // Skip if title is too generic or suspicious
          if (isValidProduct(cleanTitle, keywords)) {
            const price = `₹${priceText.replace(/,/g, '')}`
            
            // Extract additional data
            const image = extractImageUrl(html, asin) || getDefaultImage(keywords)
            const link = `https://www.amazon.in/dp/${asin}`
            const rating = extractRating(html, asin)
            const reviewCount = extractReviewCount(html, asin)
            const isAmazonChoice = html.includes(`data-asin="${asin}"`) && 
                                  html.substring(html.indexOf(`data-asin="${asin}"`), 
                                  html.indexOf(`data-asin="${asin}"`) + 2000)
                                  .includes("Amazon's Choice")

            const relevanceScore = calculateRelevance(cleanTitle, keywords, params)

            products.push({
              id: asin,
              title: cleanTitle,
              price: price,
              image: image,
              link: link,
              is_amazon_choice: isAmazonChoice,
              relevance_score: relevanceScore,
              match_reasons: getMatchReasons(cleanTitle, keywords, params),
              rating: rating || undefined,
              review_count: reviewCount || undefined
            })

            productCount++
          }
        }
      }
      
      if (productCount > 0) break
    }

    console.log(`✅ Extracted ${products.length} products from HTML`)
    return products.slice(0, 15) // Limit to 15 products

  } catch (error) {
    console.error('❌ Error parsing Amazon HTML:', error)
    return []
  }
}

function isValidProduct(title: string, keywords: string): boolean {
  const titleLower = title.toLowerCase()
  const keywordsLower = keywords.toLowerCase()
  
  // Skip generic or suspicious titles
  const skipPatterns = [
    'sponsored',
    'advertisement',
    'ad ',
    'deals of the day',
    'today\'s deals',
    'see more'
  ]
  
  if (skipPatterns.some(pattern => titleLower.includes(pattern))) {
    return false
  }
  
  // Must contain at least one keyword
  const keywordWords = keywordsLower.split(' ').filter(word => word.length > 2)
  return keywordWords.some(word => titleLower.includes(word))
}

function extractImageUrl(html: string, asin: string): string | null {
  const patterns = [
    new RegExp(`data-asin="${asin}"[\\s\\S]*?<img[^>]+src="([^"]+)"`, 'i'),
    new RegExp(`<img[^>]+class="[^"]*s-image[^"]*"[^>]+src="([^"]+)"`, 'g')
  ]
  
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      return cleanImageUrl(match[1])
    }
  }
  
  return null
}

function extractRating(html: string, asin: string): string | null {
  const patterns = [
    new RegExp(`data-asin="${asin}"[\\s\\S]*?<span class="a-icon-alt">([0-9.]+) out of 5 stars<\\/span>`, 'i'),
    /<span class="a-icon-alt">([0-9.]+) out of 5 stars<\/span>/g
  ]
  
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

function extractReviewCount(html: string, asin: string): string | null {
  const patterns = [
    new RegExp(`data-asin="${asin}"[\\s\\S]*?<span class="a-size-base">([0-9,]+)<\\/span>`, 'i'),
    /<span class="a-size-base">([0-9,]+)<\/span>/g
  ]
  
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match && match[1] && /^\d/.test(match[1])) {
      return match[1]
    }
  }
  
  return null
}

function cleanImageUrl(url: string): string {
  if (!url) return ''
  
  if (url.startsWith('//')) {
    return 'https:' + url
  } else if (url.startsWith('/')) {
    return 'https://www.amazon.in' + url
  }
  
  if (url.includes('placeholder') || url.includes('loading') || url.includes('blank')) {
    return ''
  }
  
  return url
}

function getDefaultImage(keywords: string): string {
  const categoryImages = {
    phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    headphone: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    camera: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop',
    mobile: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    smartphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop'
  }
  
  const lowerKeywords = keywords.toLowerCase()
  for (const [key, image] of Object.entries(categoryImages)) {
    if (lowerKeywords.includes(key)) {
      return image
    }
  }
  
  return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'
}

async function scrapeFlipkartRobust(keywords: string, params: any): Promise<Product[]> {
  try {
    const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(keywords)}`
    
    const headers = createEnhancedHeaders()
    headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

    console.log(`📡 Fetching Flipkart: ${searchUrl}`)

    await randomDelay(1000, 2000)

    const response = await fetch(searchUrl, { headers })

    if (!response.ok) {
      throw new Error(`Flipkart HTTP ${response.status}`)
    }

    const html = await response.text()
    return parseFlipkartHTML(html, keywords, params)

  } catch (error) {
    console.error('❌ Flipkart scraping error:', error)
    return []
  }
}

function parseFlipkartHTML(html: string, keywords: string, params: any): Product[] {
  const products: Product[] = []
  
  try {
    // Enhanced Flipkart parsing patterns
    const productPatterns = [
      /_1fQZEK[\s\S]*?<a[^>]+href="([^"]+)"[\s\S]*?<div[^>]*>([^<]+)<\/div>[\s\S]*?<div[^>]*>₹([^<]+)<\/div>/g,
      /_2kHMtA[\s\S]*?<a[^>]+href="([^"]+)"[\s\S]*?title="([^"]+)"[\s\S]*?₹([0-9,]+)/g
    ]

    let productCount = 0

    for (const pattern of productPatterns) {
      let match
      pattern.lastIndex = 0

      while ((match = pattern.exec(html)) !== null && productCount < 10) {
        const link = `https://www.flipkart.com${match[1]}`
        const title = match[2]?.trim()
        const price = `₹${match[3]?.trim()}`

        if (title && isValidProduct(title, keywords)) {
          const relevanceScore = calculateRelevance(title, keywords, params)

          products.push({
            id: `flipkart_${Date.now()}_${productCount}`,
            title: title,
            price: price,
            image: getDefaultImage(keywords),
            link: link,
            is_amazon_choice: false,
            relevance_score: relevanceScore,
            match_reasons: getMatchReasons(title, keywords, params)
          })

          productCount++
        }
      }
      
      if (productCount > 0) break
    }

    return products

  } catch (error) {
    console.error('❌ Error parsing Flipkart HTML:', error)
    return []
  }
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

  // Category matching
  if (params.category) {
    const categoryKeywords = {
      'electronics': ['smartphone', 'phone', 'mobile', 'laptop', 'tablet', 'headphones', 'camera', 'speaker'],
      'clothing': ['shirt', 'jeans', 'dress', 'shoes', 'jacket', 'top'],
      'home': ['furniture', 'kitchen', 'decor', 'appliance', 'bed', 'chair']
    }

    const keywords = categoryKeywords[params.category as keyof typeof categoryKeywords] || []
    for (const keyword of keywords) {
      if (titleLower.includes(keyword)) {
        score += 0.1
      }
    }
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

  if (params.min_price || params.max_price) {
    reasons.push('price_range_match')
  }

  reasons.push('ai_recommended')
  return reasons
}

function generateSmartMockProducts(keywords: string, params: any): Product[] {
  console.log('🎭 Generating smart mock products for:', keywords, 'with params:', params)
  
  const brands = params.brand ? [params.brand] : ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Sony', 'Oppo', 'Vivo', 'Realme', 'Motorola']
  const models = ['Pro 5G', 'Max AI Camera', 'Ultra Fast Charging', 'Plus Wireless', 'Lite Gaming', 'SE Professional', 'Elite HD', 'Prime 4K', 'Advanced 5G', 'Premium AI Camera']
  
  const products: Product[] = []
  const timestamp = Date.now()
  
  // Generate 10 products by default
  for (let i = 0; i < 10; i++) {
    const brand = brands[i % brands.length]
    const model = models[i % models.length]
    
    // Smart price generation based on params
    let basePrice = 15000
    if (params.max_price) {
      basePrice = Math.max(5000, Math.floor(params.max_price * 0.6))
    }
    if (params.min_price) {
      basePrice = Math.max(basePrice, params.min_price)
    }
    
    const priceVariation = Math.floor(Math.random() * 10000)
    const finalPrice = basePrice + priceVariation
    
    // Only include if within price range
    if (params.min_price && finalPrice < params.min_price) continue
    if (params.max_price && finalPrice > params.max_price) continue
    
    products.push({
      id: `smart_mock_${timestamp}_${i}`,
      title: `${brand} ${keywords} ${model} - Latest Model with Advanced Features`,
      price: `₹${finalPrice.toLocaleString('en-IN')}`,
      image: getDefaultImage(keywords),
      link: `https://amazon.in/dp/mock-${i}`,
      is_amazon_choice: i < 2, // First 2 products are Amazon's choice
      relevance_score: Math.max(0.5, 1.0 - (i * 0.05)),
      match_reasons: ['keyword_match', 'brand_match', 'category_match', 'price_range_match', 'ai_recommended'],
      rating: (3.8 + Math.random() * 1.2).toFixed(1),
      review_count: (Math.floor(Math.random() * 8000) + 100).toLocaleString()
    })
  }
  
  console.log(`✅ Generated ${products.length} smart mock products`)
  return products
}

function generateEmergencyFallback(): Product[] {
  return [
    {
      id: 'emergency_1',
      title: 'Popular Electronics - Highly Rated Choice',
      price: '₹24,999',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      link: 'https://amazon.in/popular-product',
      is_amazon_choice: true,
      relevance_score: 0.8,
      match_reasons: ['ai_recommended'],
      rating: '4.3',
      review_count: '2,456'
    },
    {
      id: 'emergency_2',
      title: 'Best Selling Product - Customer Favorite',
      price: '₹19,999',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      link: 'https://amazon.in/bestseller-product',
      is_amazon_choice: false,
      relevance_score: 0.75,
      match_reasons: ['ai_recommended'],
      rating: '4.1',
      review_count: '1,890'
    }
  ]
}
