# amazon_scraper.py (patched to use scraper.py)
import logging
from typing import List, Dict
from scraper import scrape_amazon
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AmazonScraper:
    def __init__(self):
        pass  # No driver setup required

    def search_products(self, query: str, max_products: int = 20) -> List[Dict]:
        logger.info(f"Searching Amazon for query: {query}")
        raw_products = scrape_amazon(keywords=query)
        
        products = []
        for i, p in enumerate(raw_products):
            if "error" in p:
                logger.warning(f"Skipping due to error: {p['error']}")
                continue

            REQUIRED_KEYS = {
                'product_id': '',
                'name': '',
                'description': '',
                'short_description': '',
                'price': 0.0,
                'original_price': 0.0,
                'discount_percentage': 0.0,
                'currency': 'INR',
                'category': '',
                'subcategory': '',
                'tags': [],
                'brand': '',
                'model': '',
                'sku': '',
                'images': [],
                'image_url': '',
                'product_url': '',
                'affiliate_url': '',
                'availability_status': '',
                'stock_quantity': 0,
                'rating': 0.0,
                'review_count': 0,
                'specifications': {},
                'features': [],
                'dimensions': '',
                'color': '',
                'size': '',
                'material': '',
                'warranty_info': '',
                'shipping_info': '',
                'return_policy': '',
                'region': '',
                'country': '',
                'platform': '',
                'seller_name': '',
                'seller_rating': None,
                'platform_specific_data': {},
                'scraped_at': datetime.utcnow().isoformat(),
                'is_active': True
            }

            # Build each product safely
            product = REQUIRED_KEYS.copy()
            product.update({
                'product_id': f"amz_{hash(p.get('link', ''))}",
                'name': p.get('title', '')[:500],
                'description': p.get('title', '')[:1000],
                'short_description': p.get('title', '')[:300],
                'price': _extract_price_float(p.get('price')),
                'original_price': _extract_price_float(p.get('price')),
                'category': 'Electronics',
                'brand': p.get('brand', ''),
                'images': [p.get('image')] if p.get('image') else [],
                'image_url': p.get('image', ''),
                'product_url': p.get('link', ''),
                'availability_status': 'in_stock',
                'region': 'India',
                'country': 'India',
                'platform': 'amazon',
                'scraped_at': datetime.utcnow().isoformat()
            })

            products.append(product)

            if len(products) >= max_products:
                break

        return products

    def close(self):
        pass  # No driver to close

    def __del__(self):
        self.close()


def _extract_price_float(price_str):
    try:
        if not price_str:
            return 0.0
        return float(price_str.replace("₹", "").replace("$", "").replace(",", "").strip())
    except:
        return 0.0
