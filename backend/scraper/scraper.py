import requests
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import random
from urllib.parse import urlencode, quote_plus
import socket
import ssl
import urllib3
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
]

def diagnose_network():
    """Comprehensive network diagnostics"""
    print("🔍 NETWORK DIAGNOSTICS")
    print("=" * 40)
    
    # Test 1: Basic DNS resolution
    try:
        socket.gethostbyname('www.amazon.in')
        print("✅ DNS Resolution: amazon.in resolves correctly")
    except socket.gaierror as e:
        print(f"❌ DNS Resolution failed: {e}")
        return False
    
    # Test 2: Basic connectivity
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        result = sock.connect_ex(('www.amazon.in', 443))
        sock.close()
        if result == 0:
            print("✅ Port 443 (HTTPS): Connection successful")
        else:
            print(f"❌ Port 443 (HTTPS): Connection failed (code: {result})")
            return False
    except Exception as e:
        print(f"❌ Socket connection failed: {e}")
        return False
    
    # Test 3: SSL/TLS handshake
    try:
        context = ssl.create_default_context()
        with socket.create_connection(('www.amazon.in', 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname='www.amazon.in') as ssock:
                print(f"✅ SSL/TLS: Handshake successful (Protocol: {ssock.version()})")
    except Exception as e:
        print(f"❌ SSL/TLS handshake failed: {e}")
        return False
    
    # Test 4: Basic HTTP request
    try:
        response = requests.get('https://www.amazon.in', timeout=15, verify=False)
        print(f"✅ Basic HTTP: Status {response.status_code}")
        if response.status_code != 200:
            print(f"⚠️  Warning: Non-200 status code")
    except requests.exceptions.Timeout:
        print("❌ Basic HTTP: Request timeout")
        return False
    except requests.exceptions.ConnectionError as e:
        print(f"❌ Basic HTTP: Connection error - {e}")
        return False
    except Exception as e:
        print(f"❌ Basic HTTP: Unexpected error - {e}")
        return False
    
    print("✅ All network tests passed!")
    return True

def create_robust_session():
    """Create a session with retry strategy and proxy support"""
    session = requests.Session()
    
    # Retry strategy
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
    )
    
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    # Headers
    session.headers.update({
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    })
    
    # Disable SSL verification if needed (for corporate networks)
    session.verify = False
    
    return session

def test_different_endpoints():
    """Test different Amazon endpoints to find working one"""
    endpoints = [
        "https://www.amazon.in",
        "https://amazon.in",
        "https://www.amazon.com",  # Fallback to .com
        "https://m.amazon.in",    # Mobile version
    ]
    
    print("\n🌐 TESTING DIFFERENT ENDPOINTS")
    print("=" * 40)
    
    session = create_robust_session()
    
    for endpoint in endpoints:
        try:
            print(f"Testing: {endpoint}")
            response = session.get(endpoint, timeout=15)
            print(f"  Status: {response.status_code}")
            
            if response.status_code == 200:
                if "amazon" in response.text.lower():
                    print(f"  ✅ Working endpoint found: {endpoint}")
                    return endpoint
                else:
                    print(f"  ⚠️  Response doesn't look like Amazon")
            else:
                print(f"  ❌ Non-200 status")
                
        except Exception as e:
            print(f"  ❌ Failed: {e}")
            continue
    
    return None

def get_image_url(img_elem):
    """Extract image URL from img element with various fallbacks"""
    if not img_elem:
        return None
    
    # Try different image URL attributes in order of preference
    url_attributes = ['src', 'data-src', 'data-lazy-src', 'data-original-src']
    
    for attr in url_attributes:
        url = img_elem.get(attr)
        if url:
            # Clean up the URL
            if url.startswith('//'):
                url = 'https:' + url
            elif url.startswith('/'):
                url = 'https://www.amazon.in' + url
            
            # Skip placeholder images
            if any(placeholder in url.lower() for placeholder in ['placeholder', 'loading', 'blank', 'spacer']):
                continue
                
            # Skip very small images (likely icons)
            if any(size in url.lower() for size in ['._sx40_', '._sx50_', '._sx60_']):
                continue
                
            return url
    
    return None

def extract_products_simple(html):
    """Enhanced product extraction with image support"""
    products = []
    soup = BeautifulSoup(html, "html.parser")
    
    # Save for debugging
    with open("debug_simple.html", "w", encoding="utf-8") as f:
        f.write(html)
    
    # Try multiple selectors for product containers
    items = (soup.select('div[data-asin]') or 
             soup.select('div.s-result-item') or
             soup.select('div.s-card-container') or
             soup.select('[data-component-type="s-search-result"]'))
    
    print(f"Found {len(items)} potential items")
    
    for item in items[:10]:
        try:
            # Title - try multiple approaches
            title = None
            title_selectors = [
                'h2 a span', 'h2 span', '.a-size-medium', 'a.a-link-normal span',
                '.s-size-mini .a-size-base-plus', '.a-size-base-plus',
                '[data-cy="title-recipe"] span'
            ]
            
            for selector in title_selectors:
                elem = item.select_one(selector)
                if elem and elem.get_text(strip=True):
                    title = elem.get_text(strip=True)
                    break
            
            # Link
            link = None
            link_elem = item.select_one('h2 a') or item.select_one('a.a-link-normal')
            if link_elem and link_elem.get('href'):
                href = link_elem['href']
                if href.startswith('/'):
                    link = "https://www.amazon.in" + href
                else:
                    link = href
            
            # Price - enhanced price extraction
            price = None
            price_selectors = [
                '.a-price .a-offscreen',
                '.a-price-whole',
                '.a-price-range .a-price .a-offscreen',
                '.a-price-symbol + .a-price-whole',
                '[data-cy="price-recipe"] .a-price .a-offscreen'
            ]
            
            for selector in price_selectors:
                price_elem = item.select_one(selector)
                if price_elem and price_elem.get_text(strip=True):
                    price = price_elem.get_text(strip=True)
                    break
            
            # Image - enhanced image extraction
            image_url = None
            image_selectors = [
                '.s-image',
                '.s-product-image-container img',
                '[data-component-type="s-product-image"] img',
                '.a-dynamic-image',
                'img.s-image'
            ]
            
            for selector in image_selectors:
                img_elem = item.select_one(selector)
                if img_elem:
                    image_url = get_image_url(img_elem)
                    if image_url:
                        break
            
            # Amazon Choice detection
            is_amazon_choice = bool(item.select_one('[aria-label*="Amazon\'s Choice"]') or 
                                  item.select_one('.a-badge-text') and 
                                  'choice' in item.select_one('.a-badge-text').get_text().lower())
            
            if title and link:
                products.append({
                    "title": title,
                    "link": link,
                    "price": price,
                    "image": image_url,
                    "is_amazon_choice": is_amazon_choice
                })
                
        except Exception as e:
            print(f"Error extracting product: {e}")
            continue
    
    return products

def extract_products_mobile(html):
    """Enhanced mobile extraction with images"""
    products = []
    soup = BeautifulSoup(html, "html.parser")
    
    with open("debug_mobile.html", "w", encoding="utf-8") as f:
        f.write(html)
    
    # Mobile-specific selectors
    items = soup.select('.s-result-item') or soup.select('[data-asin]')
    
    for item in items[:10]:
        try:
            title_elem = item.select_one('h2 span') or item.select_one('.a-size-base')
            link_elem = item.select_one('h2 a') or item.select_one('a')
            
            # Mobile image extraction
            image_url = None
            img_elem = item.select_one('img')
            if img_elem:
                image_url = get_image_url(img_elem)
            
            # Mobile price extraction
            price = None
            price_elem = item.select_one('.a-price .a-offscreen')
            if price_elem:
                price = price_elem.get_text(strip=True)
            
            if title_elem and link_elem:
                title = title_elem.get_text(strip=True)
                href = link_elem.get('href', '')
                if href.startswith('/'):
                    link = "https://www.amazon.in" + href
                else:
                    link = href
                
                if title and link:
                    products.append({
                        "title": title,
                        "link": link,
                        "price": price,
                        "image": image_url,
                        "is_amazon_choice": False
                    })
        except Exception as e:
            print(f"Error in mobile extraction: {e}")
            continue
    
    return products

def scrape_with_selenium_simple(keywords, base_url):
    """Enhanced Selenium scraping with image support"""
    driver = None
    try:
        options = Options()
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument("--disable-web-security")
        options.add_argument("--allow-running-insecure-content")
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--ignore-ssl-errors")
        options.add_argument("--ignore-certificate-errors-spki-list")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        
        search_url = f"{base_url}/s?k={quote_plus(keywords)}"
        print(f"Selenium URL: {search_url}")
        
        driver.get(search_url)
        time.sleep(5)
        
        with open("debug_selenium.html", "w", encoding="utf-8") as f:
            f.write(driver.page_source)
        
        items = driver.find_elements(By.CSS_SELECTOR, '[data-asin]') or driver.find_elements(By.CSS_SELECTOR, '.s-result-item')
        
        products = []
        for item in items[:10]:
            try:
                title_elem = item.find_element(By.CSS_SELECTOR, 'h2 span')
                link_elem = item.find_element(By.CSS_SELECTOR, 'h2 a')
                
                title = title_elem.text.strip()
                link = link_elem.get_attribute('href')
                
                # Extract image with Selenium
                image_url = None
                try:
                    img_elem = item.find_element(By.CSS_SELECTOR, 'img.s-image')
                    image_url = img_elem.get_attribute('src') or img_elem.get_attribute('data-src')
                except:
                    pass
                
                # Extract price with Selenium
                price = None
                try:
                    price_elem = item.find_element(By.CSS_SELECTOR, '.a-price .a-offscreen')
                    price = price_elem.text.strip()
                except:
                    pass
                
                # Check Amazon Choice
                is_amazon_choice = False
                try:
                    item.find_element(By.CSS_SELECTOR, '[aria-label*="Amazon\'s Choice"]')
                    is_amazon_choice = True
                except:
                    pass
                
                if title and link:
                    products.append({
                        "title": title,
                        "link": link,
                        "price": price,
                        "image": image_url,
                        "is_amazon_choice": is_amazon_choice
                    })
            except Exception as e:
                print(f"Error extracting Selenium product: {e}")
                continue
        
        return products
        
    except Exception as e:
        print(f"Selenium error: {e}")
        return []
    finally:
        if driver:
            driver.quit()

def scrape_with_different_methods(keywords, working_endpoint):
    """Try scraping with different approaches"""
    results = []
    
    print(f"\n🔄 TRYING DIFFERENT SCRAPING METHODS")
    print("=" * 40)
    
    # Method 1: Simple search URL
    try:
        print("Method 1: Simple search...")
        session = create_robust_session()
        search_url = f"{working_endpoint}/s?k={quote_plus(keywords)}"
        print(f"URL: {search_url}")
        
        response = session.get(search_url, timeout=20)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            products = extract_products_simple(response.text)
            if products:
                print(f"✅ Method 1 success: {len(products)} products")
                return products
        
    except Exception as e:
        print(f"❌ Method 1 failed: {e}")
    
    # Method 2: Mobile version
    try:
        print("\nMethod 2: Mobile version...")
        mobile_url = f"https://m.amazon.in/s?k={quote_plus(keywords)}"
        response = session.get(mobile_url, timeout=20)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            products = extract_products_mobile(response.text)
            if products:
                print(f"✅ Method 2 success: {len(products)} products")
                return products
                
    except Exception as e:
        print(f"❌ Method 2 failed: {e}")
    
    # Method 3: Selenium fallback
    try:
        print("\nMethod 3: Selenium...")
        products = scrape_with_selenium_simple(keywords, working_endpoint)
        if products:
            print(f"✅ Method 3 success: {len(products)} products")
            return products
            
    except Exception as e:
        print(f"❌ Method 3 failed: {e}")
    
    return []

def scrape_amazon(keywords, category=None, min_price=None, max_price=None, amazon_choice=False, timeout=30):
    """Main function with comprehensive diagnostics"""
    
    print("🚀 STARTING COMPREHENSIVE AMAZON SCRAPER")
    print("=" * 50)
    print(f"Keywords: {keywords}")
    print(f"Category: {category}")
    print(f"Price Range: {min_price} - {max_price}")
    print("=" * 50)
    
    # Step 1: Network diagnostics
    if not diagnose_network():
        return [{"error": "Network connectivity issues detected. Check your internet connection, firewall, or proxy settings."}]
    
    # Step 2: Find working endpoint
    working_endpoint = test_different_endpoints()
    if not working_endpoint:
        return [{"error": "All Amazon endpoints are unreachable. Possible regional blocking or network restrictions."}]
    
    # Step 3: Try different scraping methods
    products = scrape_with_different_methods(keywords, working_endpoint)
    
    if not products:
        return [{"error": "Could not extract products. Check debug HTML files for more information."}]
    
    print(f"\n✅ SUCCESS: Found {len(products)} products!")
    return products

# Alternative simple function for testing
def simple_test():
    """Simple test without all the diagnostics"""
    try:
        import requests
        response = requests.get("https://httpbin.org/ip", timeout=10)
        print(f"Your IP: {response.json()}")
        
        response = requests.get("https://www.amazon.in", timeout=15, verify=False)
        print(f"Amazon status: {response.status_code}")
        
        if "amazon" in response.text.lower():
            print("✅ Basic Amazon access works")
            return True
        else:
            print("❌ Amazon response doesn't look right")
            return False
            
    except Exception as e:
        print(f"❌ Simple test failed: {e}")
        return False

if __name__ == "__main__":
    print("QUICK CONNECTIVITY TEST")
    print("=" * 30)
    
    if simple_test():
        print("\n" + "=" * 50)
        test_params = {
            "keywords": "Samsung phone",
            "category": "electronics",
            "min_price": 10000,
            "max_price": 50000,
            "amazon_choice": False
        }
        
        results = scrape_amazon(**test_params)
        
        print(f"\nFINAL RESULTS:")
        for i, product in enumerate(results[:3], 1):
            if "error" in product:
                print(f"{i}. ❌ Error: {product['error']}")
            else:
                print(f"{i}. ✅ {product.get('title', 'No title')[:50]}...")
                print(f"   💰 Price: {product.get('price', 'N/A')}")
                print(f"   🖼️  Image: {product.get('image', 'No image')}")
                print(f"   🏆 Amazon Choice: {product.get('is_amazon_choice', False)}")
                print()
    else:
        print("❌ Basic connectivity failed. Check your network setup.")