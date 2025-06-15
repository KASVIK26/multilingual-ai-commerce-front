
import time
import random
import logging
from typing import List, Dict, Optional
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import undetected_chromedriver as uc
from fake_useragent import UserAgent
from bs4 import BeautifulSoup
import requests
from config import CHROME_OPTIONS, USER_AGENTS, SCRAPING_DELAY, MAX_RETRIES, TIMEOUT

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AmazonScraper:
    def __init__(self):
        self.driver = None
        self.ua = UserAgent()
        
    def setup_driver(self):
        """Setup Chrome driver with anti-detection measures"""
        try:
            options = uc.ChromeOptions()
            
            # Add anti-detection options
            for option in CHROME_OPTIONS:
                options.add_argument(option)
            
            # Random user agent
            user_agent = random.choice(USER_AGENTS)
            options.add_argument(f'--user-agent={user_agent}')
            
            # Additional anti-detection
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option('useAutomationExtension', False)
            
            self.driver = uc.Chrome(options=options)
            
            # Execute script to remove webdriver property
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            logger.info("Chrome driver setup successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to setup driver: {e}")
            return False
    
    def human_like_behavior(self):
        """Simulate human-like behavior"""
        # Random scroll
        scroll_height = random.randint(100, 500)
        self.driver.execute_script(f"window.scrollBy(0, {scroll_height});")
        time.sleep(random.uniform(0.5, 1.5))
        
        # Random mouse movement (simulated via JavaScript)
        self.driver.execute_script("""
            var event = new MouseEvent('mousemove', {
                clientX: Math.random() * window.innerWidth,
                clientY: Math.random() * window.innerHeight
            });
            document.dispatchEvent(event);
        """)
        
        time.sleep(random.uniform(*SCRAPING_DELAY))
    
    def search_products(self, query: str, max_products: int = 20) -> List[Dict]:
        """Search for products on Amazon"""
        if not self.driver:
            if not self.setup_driver():
                return []
        
        products = []
        
        try:
            # Navigate to Amazon
            self.driver.get("https://www.amazon.com")
            self.human_like_behavior()
            
            # Handle potential CAPTCHA or location popup
            self.handle_popups()
            
            # Find search box and search
            search_box = WebDriverWait(self.driver, TIMEOUT).until(
                EC.presence_of_element_located((By.ID, "twotabsearchtextbox"))
            )
            
            search_box.clear()
            search_box.send_keys(query)
            
            # Click search button
            search_button = self.driver.find_element(By.ID, "nav-search-submit-button")
            search_button.click()
            
            self.human_like_behavior()
            
            # Wait for results to load
            WebDriverWait(self.driver, TIMEOUT).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-component-type='s-search-result']"))
            )
            
            # Extract products
            products = self.extract_products_from_page(max_products)
            
            logger.info(f"Successfully scraped {len(products)} products for query: {query}")
            
        except TimeoutException:
            logger.error("Timeout while loading Amazon search results")
        except Exception as e:
            logger.error(f"Error during scraping: {e}")
        
        return products
    
    def handle_popups(self):
        """Handle common Amazon popups"""
        try:
            # Location popup
            location_popup = WebDriverWait(self.driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-action-type='DISMISS']"))
            )
            location_popup.click()
            logger.info("Dismissed location popup")
        except:
            pass
        
        try:
            # CAPTCHA detection
            if "captcha" in self.driver.current_url.lower():
                logger.warning("CAPTCHA detected - manual intervention required")
                input("Please solve the CAPTCHA manually and press Enter to continue...")
        except:
            pass
    
    def extract_products_from_page(self, max_products: int) -> List[Dict]:
        """Extract product information from search results"""
        products = []
        
        try:
            # Find all product containers
            product_containers = self.driver.find_elements(
                By.CSS_SELECTOR, 
                "[data-component-type='s-search-result']"
            )
            
            for container in product_containers[:max_products]:
                try:
                    product = self.extract_single_product(container)
                    if product:
                        products.append(product)
                        
                except Exception as e:
                    logger.debug(f"Error extracting single product: {e}")
                    continue
            
        except Exception as e:
            logger.error(f"Error extracting products from page: {e}")
        
        return products
    
    def extract_single_product(self, container) -> Optional[Dict]:
        """Extract information from a single product container"""
        try:
            product = {}
            
            # Product title
            try:
                title_element = container.find_element(By.CSS_SELECTOR, "h2 a span")
                product['title'] = title_element.text.strip()
                product['name'] = product['title']
            except:
                return None
            
            # Product URL
            try:
                link_element = container.find_element(By.CSS_SELECTOR, "h2 a")
                product['link'] = "https://www.amazon.com" + link_element.get_attribute('href')
                product['product_url'] = product['link']
            except:
                product['link'] = ""
                product['product_url'] = ""
            
            # Price
            try:
                price_element = container.find_element(By.CSS_SELECTOR, ".a-price-whole")
                price_fraction = ""
                try:
                    price_fraction = container.find_element(By.CSS_SELECTOR, ".a-price-fraction").text
                except:
                    pass
                
                price_text = price_element.text + "." + price_fraction if price_fraction else price_element.text
                product['price'] = float(price_text.replace(',', ''))
                product['original_price'] = product['price']
            except:
                try:
                    # Alternative price selector
                    price_element = container.find_element(By.CSS_SELECTOR, ".a-price .a-offscreen")
                    price_text = price_element.get_attribute('textContent').replace('$', '').replace(',', '')
                    product['price'] = float(price_text)
                    product['original_price'] = product['price']
                except:
                    product['price'] = 0.0
                    product['original_price'] = 0.0
            
            # Image
            try:
                img_element = container.find_element(By.CSS_SELECTOR, "img")
                product['image'] = img_element.get_attribute('src')
                product['image_url'] = product['image']
            except:
                product['image'] = ""
                product['image_url'] = ""
            
            # Rating
            try:
                rating_element = container.find_element(By.CSS_SELECTOR, ".a-icon-alt")
                rating_text = rating_element.get_attribute('textContent')
                product['rating'] = float(rating_text.split()[0])
            except:
                product['rating'] = 0.0
            
            # Review count
            try:
                review_element = container.find_element(By.CSS_SELECTOR, "a[href*='#customerReviews'] span")
                review_text = review_element.text.replace(',', '').replace('(', '').replace(')', '')
                product['review_count'] = int(review_text)
            except:
                product['review_count'] = 0
            
            # Amazon's Choice
            try:
                container.find_element(By.CSS_SELECTOR, "[data-a-badge-text*='Amazon']")
                product['is_amazon_choice'] = True
            except:
                product['is_amazon_choice'] = False
            
            # Additional fields for database
            product['product_id'] = f"amz_{hash(product.get('link', ''))}"
            product['platform'] = 'amazon'
            product['currency'] = 'USD'
            product['availability_status'] = 'in_stock'
            product['region'] = 'United States'
            product['category'] = 'Electronics'  # Default category
            
            return product
            
        except Exception as e:
            logger.debug(f"Error extracting single product details: {e}")
            return None
    
    def close(self):
        """Close the driver"""
        if self.driver:
            self.driver.quit()
            logger.info("Driver closed")

    def __del__(self):
        """Ensure driver is closed when object is destroyed"""
        self.close()
