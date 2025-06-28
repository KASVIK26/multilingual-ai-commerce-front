#!/usr/bin/env python3
"""
Test scraper without database storage
"""

from amazon_scraper import AmazonScraper
import json

def test_scraper():
    """Test the scraper functionality without database"""
    print("🧪 Testing Amazon Scraper (No Database)")
    print("=" * 50)
    
    scraper = AmazonScraper()
    
    # Test different queries
    test_queries = ["laptop", "headphones", "smartphone"]
    
    for query in test_queries:
        print(f"\n🔍 Testing query: {query}")
        products = scraper.search_products(query, max_products=3)
        
        if products:
            print(f"✅ Found {len(products)} products")
            for i, product in enumerate(products, 1):
                print(f"  {i}. {product.get('name', 'N/A')[:50]}...")
                print(f"     Price: ₹{product.get('price', 0)}")
                print(f"     Rating: {product.get('rating', 'N/A')}")
        else:
            print("❌ No products found")
    
    scraper.close()
    print("\n🎉 Test completed!")

if __name__ == "__main__":
    test_scraper()
