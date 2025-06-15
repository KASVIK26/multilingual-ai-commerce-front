
# Amazon Product Scraper

A robust Python-based web scraper for Amazon products using Selenium WebDriver with anti-bot detection measures.

## Features

- **Anti-Bot Detection**: Uses undetected-chromedriver and human-like behavior simulation
- **Robust Scraping**: Multiple retry mechanisms and error handling
- **Database Integration**: Direct integration with Supabase for storing products
- **Configurable**: Easy to configure for different search queries and product limits

## Installation

1. Install Python 3.8+
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

## Usage

### Command Line
```bash
# Basic usage
python main.py "iphone 15"

# With custom product limit
python main.py "wireless headphones" --max-products 50

# Verbose output
python main.py "laptop" --verbose
```

### As a Module
```python
from main import scrape_and_store

# Scrape products and store in database
scrape_and_store("gaming mouse", max_products=30)
```

## Configuration

Edit `config.py` to customize:
- Scraping delays and timeouts
- Chrome browser options
- User agent rotation
- Database settings

## Troubleshooting

1. **Chrome Driver Issues**: The scraper uses undetected-chromedriver which automatically downloads the correct Chrome driver
2. **CAPTCHA**: If Amazon shows CAPTCHA, the scraper will pause for manual solving
3. **Rate Limiting**: Adjust `SCRAPING_DELAY` in config.py for slower scraping

## Database Schema

Products are stored with the following fields:
- `product_id`: Unique identifier
- `name`: Product name
- `price`: Current price
- `image_url`: Product image URL
- `product_url`: Amazon product page URL
- `rating`: Product rating (0-5)
- `review_count`: Number of reviews
- `platform`: Always 'amazon'
- `category`: Product category
- `availability_status`: Stock status

## Anti-Bot Measures

- Randomized user agents
- Human-like scrolling and mouse movements
- Random delays between requests
- Chrome browser fingerprint masking
- JavaScript execution to remove webdriver properties
