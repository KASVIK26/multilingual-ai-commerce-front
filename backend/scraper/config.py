import os
from dotenv import load_dotenv

load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://xaymwtshzpnxdammjwzz.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhheW13dHNoenBueGRhbW1qd3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0Njc4MDksImV4cCI6MjA2NTA0MzgwOX0.1CJou1MlUXzdLJmTwMEAZ5YmyQ7UtoFesKNrEDFcGHk')

# For admin operations like scraping, we might need service role key
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', SUPABASE_KEY)

# Scraping configuration
SCRAPING_DELAY = (2, 5)  # Random delay between requests
MAX_RETRIES = 3
TIMEOUT = 30

# Chrome options for anti-detection
CHROME_OPTIONS = [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',
    '--disable-extensions',
    '--disable-plugins',
    '--disable-images',  # Faster loading
    '--disable-javascript',  # We'll enable when needed
    '--window-size=1920,1080'
]

# User agents pool
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
]
