#!/usr/bin/env python3
"""
AI Chat Demo - Test the complete AI processing pipeline
"""

import json
import sys
sys.path.append('.')

from amazon_scraper import AmazonScraper
from database import ProductDatabase

def demo_ai_processing():
    """Demonstrate AI-powered query processing"""
    
    # Test queries that show different AI capabilities
    test_queries = [
        {
            "query": "show me samsung smartphones under 50000",
            "expected": {
                "intent": "product_search",
                "category": "Electronics", 
                "brand": "samsung",
                "product_type": "smartphone",
                "max_price": 50000
            }
        },
        {
            "query": "find apple laptops under 100000",
            "expected": {
                "intent": "product_search",
                "category": "Electronics",
                "brand": "apple", 
                "product_type": "laptop",
                "max_price": 100000
            }
        },
        {
            "query": "looking for nike shoes under 5000",
            "expected": {
                "intent": "product_search",
                "brand": "nike",
                "max_price": 5000
            }
        }
    ]
    
    print("🤖 AI CHAT PROCESSING DEMO")
    print("=" * 50)
    
    for i, test in enumerate(test_queries, 1):
        print(f"\n📝 Test {i}: {test['query']}")
        print("-" * 40)
        
        # Simulate the AI processing that would happen in the edge function
        extracted_features = extract_features_simulation(test['query'])
        
        print(f"🎯 Extracted Features:")
        for key, value in extracted_features.items():
            print(f"   {key}: {value}")
        
        # Check against expected
        print(f"\n✅ Expected vs Extracted:")
        for key, expected_value in test['expected'].items():
            actual_value = extracted_features.get(key)
            match = "✓" if actual_value == expected_value else "✗"
            print(f"   {match} {key}: {expected_value} → {actual_value}")
        
        # Show what would be scraped
        search_query = build_search_query(extracted_features)
        print(f"\n🔍 Search Query: '{search_query}'")
        
    print(f"\n🎉 Demo complete! This shows how the AI processes user queries.")
    print(f"💡 In the real system, this happens in the HuggingFace-powered edge function.")

def extract_features_simulation(query):
    """Simulate the AI feature extraction (simplified version)"""
    features = {}
    lower_query = query.lower()
    
    # Intent detection
    if any(word in lower_query for word in ['show', 'find', 'looking for', 'get me']):
        features['intent'] = 'product_search'
    
    # Category detection
    if any(word in lower_query for word in ['smartphone', 'phone', 'mobile']):
        features['category'] = 'Electronics'
        features['product_type'] = 'smartphone'
    elif any(word in lower_query for word in ['laptop', 'computer']):
        features['category'] = 'Electronics' 
        features['product_type'] = 'laptop'
    elif 'shoes' in lower_query:
        features['category'] = 'Fashion'
        features['product_type'] = 'shoes'
    
    # Brand detection
    brands = ['samsung', 'apple', 'nike', 'adidas', 'sony', 'lg']
    for brand in brands:
        if brand in lower_query:
            features['brand'] = brand
            break
    
    # Price extraction
    import re
    price_pattern = r'under\s+(\d+(?:,\d{3})*)'
    match = re.search(price_pattern, lower_query)
    if match:
        features['max_price'] = int(match.group(1).replace(',', ''))
    
    return features

def build_search_query(features):
    """Build search query from extracted features"""
    query_parts = []
    
    if features.get('brand'):
        query_parts.append(features['brand'])
    
    if features.get('product_type'):
        query_parts.append(features['product_type'])
    elif features.get('category'):
        query_parts.append(features['category'])
    
    return ' '.join(query_parts) if query_parts else 'electronics'

if __name__ == "__main__":
    demo_ai_processing()
