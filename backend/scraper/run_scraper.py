
#!/usr/bin/env python3
"""
Utility script to run the scraper for common product categories
"""

import time
from main import scrape_and_store

# Common search queries to populate the database
COMMON_QUERIES = [
    "iphone 15",
    "samsung galaxy s24",
    "wireless headphones",
    "laptop computer",
    "gaming mouse",
    "bluetooth speaker",
    "smartwatch",
    "wireless charger",
    "tablet ipad",
    "gaming keyboard",
    "webcam",
    "monitor display",
    "phone case",
    "power bank",
    "usb cable",
    "wireless earbuds",
    "home security camera",
    "smart tv",
    "fitness tracker",
    "portable speaker"
]

def populate_database():
    """Populate database with products from common queries"""
    print("Starting database population with common product categories...")
    
    for i, query in enumerate(COMMON_QUERIES, 1):
        print(f"\n[{i}/{len(COMMON_QUERIES)}] Scraping: {query}")
        
        try:
            scrape_and_store(query, max_products=15)
            print(f"✓ Completed: {query}")
            
            # Wait between queries to avoid rate limiting
            if i < len(COMMON_QUERIES):
                wait_time = 30  # 30 seconds between queries
                print(f"Waiting {wait_time} seconds before next query...")
                time.sleep(wait_time)
                
        except Exception as e:
            print(f"✗ Failed: {query} - {e}")
            continue
    
    print("\n🎉 Database population completed!")
    print("You can now test the chat interface with product searches.")

if __name__ == "__main__":
    populate_database()
