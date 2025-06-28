// Enhanced mock product generator for testing
// This can be used to test the frontend with better product data

const generateEnhancedMockProducts = (query) => {
  const products = {
    samsung: [
      {
        id: 'samsung_1',
        title: 'Samsung Galaxy S24 Ultra (256GB) - Titanium Gray',
        description: 'Built-in S Pen, Pro-grade Camera with AI features, 200MP camera system',
        specs: ['6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '200MP Camera', 'S Pen included'],
        price: '₹1,34,999',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0CTKGVKZK',
        is_amazon_choice: true,
        rating: '4.5',
        review_count: '2,847'
      },
      {
        id: 'samsung_2', 
        title: 'Samsung Galaxy S24+ (512GB) - Onyx Black',
        description: 'Enhanced performance, Advanced AI capabilities, Premium aluminum design',
        specs: ['6.7" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '50MP Triple Camera', '4900mAh battery'],
        price: '₹94,999',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0CTKFXK4Q',
        is_amazon_choice: false,
        rating: '4.3',
        review_count: '1,582'
      },
      {
        id: 'samsung_3',
        title: 'Samsung Galaxy A54 5G (128GB) - Awesome Violet', 
        description: 'Premium design with great camera performance and 5G connectivity',
        specs: ['6.4" Super AMOLED', 'Exynos 1380', '50MP OIS Camera', '5000mAh battery'],
        price: '₹38,999',
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0BZS1G7NK',
        is_amazon_choice: true,
        rating: '4.2',
        review_count: '3,426'
      }
    ],
    
    apple: [
      {
        id: 'apple_1',
        title: 'Apple iPhone 15 (128GB) - Natural Titanium',
        description: 'Dynamic Island, 48MP Main camera, USB-C, Action button',
        specs: ['6.1" Super Retina XDR display', 'A17 Pro chip', '48MP Camera System', 'USB-C connector'],
        price: '₹79,900',
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0CHX1W1XY',
        is_amazon_choice: true,
        rating: '4.6',
        review_count: '5,284'
      },
      {
        id: 'apple_2',
        title: 'Apple iPhone 15 Plus (256GB) - Blue',
        description: 'Larger 6.7" display with Dynamic Island and advanced camera system',
        specs: ['6.7" Super Retina XDR display', 'A17 Pro chip', '48MP Camera System', 'All-day battery'],
        price: '₹89,900',
        image: 'https://images.unsplash.com/photo-1611791484658-350aafc33a23?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0CHX2RDGX',
        is_amazon_choice: false,
        rating: '4.5',
        review_count: '2,847'
      }
    ],

    smartphone: [
      {
        id: 'oneplus_1',
        title: 'OnePlus 12 (256GB) - Flowy Emerald',
        description: 'Hasselblad Camera for Mobile, 120Hz ProXDR Display, 100W SUPERVOOC charging',
        specs: ['6.82" ProXDR Display', 'Snapdragon 8 Gen 3', 'Hasselblad Camera', '100W SuperVOOC'],
        price: '₹64,999',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0CS5Z6DXP',
        is_amazon_choice: true,
        rating: '4.4',
        review_count: '1,923'
      },
      {
        id: 'google_1',
        title: 'Google Pixel 8 (128GB) - Obsidian',
        description: 'Google AI features, Best-in-class camera, 7 years of security updates',
        specs: ['6.2" Actua display', 'Google Tensor G3', 'Advanced AI features', 'Titan M security'],
        price: '₹75,999',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
        link: 'https://www.amazon.in/dp/B0CGT7JBPN',
        is_amazon_choice: false,
        rating: '4.3',
        review_count: '1,456'
      }
    ]
  };

  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('samsung')) {
    return products.samsung;
  } else if (queryLower.includes('apple') || queryLower.includes('iphone')) {
    return products.apple;
  } else {
    return products.smartphone;
  }
};

// Test the function
console.log('🧪 Testing enhanced mock products:');
console.log(JSON.stringify(generateEnhancedMockProducts('samsung smartphones under 50000'), null, 2));
