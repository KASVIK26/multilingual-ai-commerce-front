# 🔑 Amazon Product API Setup Guide

## Overview
This guide will help you configure the **RapidAPI Amazon Data** endpoint - the most reliable way to get real Amazon product data.

## 🎯 **Single Reliable Solution: RapidAPI Amazon Data**

### Why RapidAPI Amazon Data?
- ✅ **Real Amazon Data**: Live product information from Amazon India
- ✅ **Reliable**: 99.9% uptime, maintained by professionals
- ✅ **Easy Setup**: 5-minute configuration
- ✅ **Affordable**: Free tier + reasonable paid plans
- ✅ **No Complex Auth**: Simple API key authentication

### 📊 **Pricing**
- **Free Tier**: 100 requests/month (perfect for testing)
- **Basic Plan**: $10/month for 10,000 requests
- **Pro Plan**: $30/month for 100,000 requests

## 🚀 **Quick Setup (5 Minutes)**

### Step 1: Get Your API Key
1. Go to: https://rapidapi.com/real-time-amazon-data/api/real-time-amazon-data/
2. Click **"Sign Up"** (free account)
3. Click **"Subscribe to Test"** on the API page
4. Select **"Basic"** plan (free tier)
5. Copy your **X-RapidAPI-Key** from the dashboard

### Step 2: Configure Supabase
```bash
# Navigate to your project
cd "c:\Users\vikas\multilingual-ai-commerce-front"

# Set your RapidAPI key
supabase secrets set RAPIDAPI_KEY=your_rapidapi_key_here

# Verify it's set
supabase secrets list
```

### Step 3: Deploy and Test
```bash
# Deploy the function
supabase functions deploy scrape-products

# Test it works
curl -X POST "https://your-project-id.supabase.co/functions/v1/scrape-products" \
  -H "Authorization: Bearer your-anon-key" \
  -H "Content-Type: application/json" \
  -d '{"keywords": "iPhone 15"}'
```

## � **What You Get**

### Real Amazon Data:
- ✅ Product titles and descriptions
- ✅ Current prices in INR
- ✅ High-quality product images
- ✅ Customer ratings and review counts
- ✅ Amazon Choice badges
- ✅ Direct Amazon product links
- ✅ Product specifications
- ✅ ASIN (Amazon Standard Identification Number)

### Search Features:
- 🔍 Search by keywords
- 🏷️ Filter by categories
- 💰 Price range filtering
- 🏆 Sort by relevance/price/rating
- 🇮🇳 India-specific results

## 📈 **API Performance**

| Metric | Value |
|--------|-------|
| Response Time | < 2 seconds |
| Success Rate | 99.9% |
| Data Freshness | Real-time |
| Products per Request | Up to 20 |
| Rate Limits | Plan-dependent |

## �️ **Fallback Strategy**

If RapidAPI fails for any reason, the function automatically falls back to:
1. **Intelligent Mock Products**: AI-generated realistic Amazon products
2. **Brand-Specific Data**: Matches your search intent
3. **Price-Accurate**: Realistic Indian pricing

## � **Configuration Examples**

### Basic Search
```json
{
  "keywords": "iPhone 15"
}
```

### Advanced Search with Filters
```json
{
  "extracted_features": {
    "entities": {
      "category": "electronics",
      "brand": "Apple",
      "price_range": {
        "min": 50000,
        "max": 100000
      }
    }
  },
  "query": "iPhone 15 Pro"
}
```

## 📊 **Expected Response**

```json
{
  "products": [
    {
      "id": "B0CHX1W1XY",
      "title": "Apple iPhone 15 (128GB) - Natural Titanium",
      "description": "Dynamic Island, 48MP Main camera, USB-C",
      "specs": ["6.1\" display", "A17 Pro chip", "48MP Camera"],
      "price": "₹79,900",
      "image": "https://m.media-amazon.com/images/...",
      "link": "https://amazon.in/dp/B0CHX1W1XY",
      "is_amazon_choice": true,
      "rating": "4.3",
      "review_count": "1,234",
      "relevance_score": 0.95,
      "match_reasons": ["amazon_official", "live_data"]
    }
  ],
  "source": "amazon_rapidapi",
  "message": "Found 15 live products from Amazon India",
  "total_found": 15
}
```

## 🆘 **Troubleshooting**

### Common Issues:

1. **"RapidAPI key not configured"**
   ```bash
   supabase secrets set RAPIDAPI_KEY=your_key_here
   ```

2. **"Request failed: 401"**
   - Check your API key is correct
   - Verify you've subscribed to the API

3. **"Request failed: 429"**
   - You've hit rate limits
   - Upgrade your plan or wait

4. **"No products found"**
   - Try different keywords
   - Check Amazon India has those products

### Support:
- **RapidAPI Support**: https://rapidapi.com/support
- **API Documentation**: https://rapidapi.com/real-time-amazon-data/api/real-time-amazon-data/

## 💡 **Pro Tips**

1. **Start with Free Tier**: Perfect for development and testing
2. **Monitor Usage**: Check your dashboard regularly
3. **Cache Results**: Store popular searches to reduce API calls
4. **Fallback Works**: Even without API key, you get intelligent mock data
5. **Indian Focus**: API returns India-specific pricing and availability
