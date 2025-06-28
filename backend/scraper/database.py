
import logging
from typing import List, Dict
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_KEY
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ProductDatabase:
    def __init__(self):
        # Use service role key for admin operations like scraping
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    def store_products(self, products: List[Dict]) -> bool:
        """Store scraped products in the database"""
        try:
            if not products:
                logger.warning("No products to store")
                return True
            
            # Prepare products for insertion
            processed_products = []
            for product in products:
                processed_product = {
                    'product_id': product.get('product_id', ''),
                    'name': product.get('name', '')[:500],  # Limit length
                    'description': product.get('title', '')[:1000] if product.get('title') else None,
                    'price': product.get('price', 0),
                    'original_price': product.get('original_price'),
                    'currency': product.get('currency', 'USD'),
                    'category': product.get('category', 'Electronics'),
                    'brand': product.get('brand'),
                    'image_url': product.get('image_url'),
                    'product_url': product.get('product_url'),
                    'rating': product.get('rating'),
                    'review_count': product.get('review_count', 0),
                    'availability_status': product.get('availability_status', 'in_stock'),
                    'platform': product.get('platform', 'amazon'),
                    'region': product.get('region', 'United States'),
                    'is_active': True
                }
                
                # Remove None values
                processed_product = {k: v for k, v in processed_product.items() if v is not None}
                processed_products.append(processed_product)
            def log_product_keys(products):
                print("\n🔍 Checking all product keys...")
                keys_list = [set(p.keys()) for p in products]
                base_keys = keys_list[0]
                for i, keys in enumerate(keys_list):
                    if keys != base_keys:
                        print(f"❌ Mismatch in product {i}")
                        print(f"Expected keys: {sorted(list(base_keys))}")
                        print(f"Found keys:    {sorted(list(keys))}")
                        missing = base_keys - keys
                        extra = keys - base_keys
                        if missing:
                            print(f"  🔻 Missing: {missing}")
                        if extra:
                            print(f"  🔺 Extra:   {extra}")
                        print(json.dumps(products[i], indent=2))
                        break
                else:
                    print("✅ All product dicts have consistent keys.")

            # Call this inside your store function just before insert
            log_product_keys(products)
            # Insert products into database
            try:
                result = self.supabase.table('products').upsert(
                    processed_products,
                    on_conflict='product_id'
                ).execute()
                
                if result.data:
                    logger.info(f"Successfully stored {len(result.data)} products in database")
                    return True
                else:
                    logger.error("Failed to store products - no data returned")
                    return False
            except Exception as db_error:
                logger.error(f"Database error: {db_error}")
                # Check if it's an RLS policy error
                if "row-level security" in str(db_error):
                    logger.error("RLS Policy Error: The products table has Row Level Security enabled.")
                    logger.error("Please run the SQL commands in fix_rls_policy.sql in your Supabase dashboard.")
                    logger.error("Or configure SUPABASE_SERVICE_ROLE_KEY in your .env file.")
                return False
                
        except Exception as e:
            logger.error(f"Error storing products in database: {e}")
            return False
    
    def get_products_by_query(self, query: str, limit: int = 20) -> List[Dict]:
        """Get products from database that match the query"""
        try:
            # Search in name, description, and brand
            result = self.supabase.table('products').select('*').or_(
                f'name.ilike.%{query}%,description.ilike.%{query}%,brand.ilike.%{query}%'
            ).eq('is_active', True).limit(limit).execute()
            
            if result.data:
                logger.info(f"Found {len(result.data)} products matching query: {query}")
                return result.data
            else:
                logger.info(f"No products found matching query: {query}")
                return []
                
        except Exception as e:
            logger.error(f"Error querying products from database: {e}")
            return []
    
    def clear_old_products(self, platform: str = 'amazon', days_old: int = 7):
        """Mark old products as inactive"""
        try:
            from datetime import datetime, timedelta
            
            cutoff_date = datetime.now() - timedelta(days=days_old)
            
            result = self.supabase.table('products').update({
                'is_active': False
            }).eq('platform', platform).lt('scraped_at', cutoff_date.isoformat()).execute()
            
            logger.info(f"Marked old {platform} products as inactive")
            return True
            
        except Exception as e:
            logger.error(f"Error clearing old products: {e}")
            return False
