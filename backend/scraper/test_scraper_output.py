#!/usr/bin/env python3
"""
Test script to check what data structure our scraper produces
"""

import sys
sys.path.append('.')
import json
from amazon_scraper import AmazonScraper

def test_scraper_output():
    """Test what data structure the scraper produces"""
    print("🧪 Testing scraper output structure...")
    
    # Initialize scraper
    scraper = AmazonScraper()
    
    try:
        # Scrape just 1 product for testing
        products = scraper.search_products("test phone", max_products=1)
        
        if products:
            print(f"\n✅ Successfully scraped {len(products)} product(s)")
            print("\n📋 Product data structure:")
            print(json.dumps(products[0], indent=2, default=str))
            
            print(f"\n🔑 Available keys: {list(products[0].keys())}")
            
            # Check required fields for database
            required_fields = ['product_id', 'name', 'price', 'category']
            missing_fields = [field for field in required_fields if field not in products[0]]
            
            if missing_fields:
                print(f"\n❌ Missing required fields: {missing_fields}")
            else:
                print(f"\n✅ All required fields present")
                
        else:
            print("\n❌ No products scraped")
            
    except Exception as e:
        print(f"\n❌ Error during scraping: {e}")
    finally:
        scraper.close()

if __name__ == "__main__":
    test_scraper_output()
