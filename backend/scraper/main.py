
#!/usr/bin/env python3
import sys
import argparse
import logging
from amazon_scraper import AmazonScraper
from database import ProductDatabase

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def scrape_and_store(query: str, max_products: int = 20):
    """Main function to scrape products and store them"""
    logger.info(f"Starting scraping for query: {query}")
    
    # Initialize scraper and database
    scraper = AmazonScraper()
    db = ProductDatabase()
    
    try:
        # Scrape products
        products = scraper.search_products(query, max_products)
        
        if products:
            logger.info(f"Successfully scraped {len(products)} products")
            
            # Store in database
            success = db.store_products(products)
            
            if success:
                logger.info("Products stored successfully in database")
                
                # Print summary
                print(f"\n=== SCRAPING SUMMARY ===")
                print(f"Query: {query}")
                print(f"Products scraped: {len(products)}")
                print(f"Database storage: {'Success' if success else 'Failed'}")
                
                # Print first few products
                print(f"\n=== SAMPLE PRODUCTS ===")
                for i, product in enumerate(products[:3]):
                    print(f"{i+1}. {product.get('name', 'N/A')}")
                    print(f"   Price: ${product.get('price', 0)}")
                    print(f"   Rating: {product.get('rating', 'N/A')}/5")
                    print()
                
            else:
                logger.error("Failed to store products in database")
                
        else:
            logger.warning("No products were scraped")
            
    except Exception as e:
        logger.error(f"Error during scraping process: {e}")
        
    finally:
        # Clean up
        scraper.close()

def main():
    parser = argparse.ArgumentParser(description='Amazon Product Scraper')
    parser.add_argument('query', help='Search query for products')
    parser.add_argument('--max-products', type=int, default=20, help='Maximum number of products to scrape')
    parser.add_argument('--verbose', '-v', action='store_true', help='Enable verbose logging')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    scrape_and_store(args.query, args.max_products)

if __name__ == "__main__":
    main()
