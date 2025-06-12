
-- Users table for authentication and user management
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  profile_image_url TEXT,
  language_preference VARCHAR(10) DEFAULT 'en',
  is_email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table for storing scraped product information
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id VARCHAR(100) UNIQUE NOT NULL, -- External product ID from scraper
  name VARCHAR(500) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  category VARCHAR(100),
  subcategory VARCHAR(100),
  brand VARCHAR(100),
  image_url TEXT,
  product_url TEXT,
  availability_status VARCHAR(50) DEFAULT 'in_stock', -- in_stock, low_stock, out_of_stock
  rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  region VARCHAR(100),
  platform VARCHAR(50), -- amazon, flipkart, etc.
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chats table for storing chat sessions
CREATE TABLE chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active', -- active, archived, deleted
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table for storing individual messages in chats
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text', -- text, product_list, product_card, action
  metadata JSONB, -- For storing additional data like product IDs, search filters, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User search queries and NLP extracted features
CREATE TABLE search_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  original_query TEXT NOT NULL,
  extracted_features JSONB, -- NLP extracted features like category, price_range, brand, etc.
  search_filters JSONB, -- Converted filters for scraper
  query_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search results linking queries to products
CREATE TABLE search_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query_id UUID REFERENCES search_queries(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  relevance_score DECIMAL(5, 4), -- 0.0000 to 1.0000
  position_in_results INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping cart functionality
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_addition DECIMAL(10, 2) NOT NULL, -- Price when item was added
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Orders for simulating order processing
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
  total_amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  shipping_address JSONB,
  billing_address JSONB,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items for individual products in orders
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(500) NOT NULL, -- Store name in case product is deleted
  product_image_url TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences and behavior tracking
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  preferred_categories TEXT[], -- Array of preferred categories
  preferred_brands TEXT[], -- Array of preferred brands
  price_range_min DECIMAL(10, 2),
  price_range_max DECIMAL(10, 2),
  preferred_regions TEXT[], -- Array of preferred regions
  notification_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Product interactions for recommendation system
CREATE TABLE product_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL, -- view, click, add_to_cart, purchase, like, share
  interaction_duration INTEGER, -- in seconds for view interactions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reorder suggestions based on purchase history
CREATE TABLE reorder_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  last_ordered_at TIMESTAMP WITH TIME ZONE,
  typical_reorder_interval INTEGER, -- days between reorders
  next_suggested_date DATE,
  priority_score DECIMAL(5, 4), -- 0.0000 to 1.0000
  status VARCHAR(20) DEFAULT 'active', -- active, dismissed, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_platform ON products(platform);
CREATE INDEX idx_search_queries_user_id ON search_queries(user_id);
CREATE INDEX idx_search_results_query_id ON search_results(search_query_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_product_interactions_user_id ON product_interactions(user_id);
CREATE INDEX idx_product_interactions_product_id ON product_interactions(product_id);
CREATE INDEX idx_reorder_suggestions_user_id ON reorder_suggestions(user_id);

-- Create triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reorder_suggestions_updated_at BEFORE UPDATE ON reorder_suggestions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO users (email, password_hash, first_name, last_name, is_email_verified) VALUES
('test@example.com', '$2b$10$example_hash', 'Test', 'User', true),
('demo@example.com', '$2b$10$example_hash', 'Demo', 'User', true);

-- Sample products data
INSERT INTO products (product_id, name, description, price, category, brand, availability_status, rating, region, platform) VALUES
('A23XH12', 'Smart AirPods Max', 'Premium wireless headphones with noise cancellation', 10900.00, 'Electronics', 'Apple', 'in_stock', 4.5, 'United States', 'amazon'),
('B77YT56', 'Eco Bamboo Toothbrush', 'Sustainable bamboo toothbrush pack of 4', 3500.00, 'Health & Beauty', 'EcoFriendly', 'low_stock', 4.2, 'Germany', 'amazon'),
('C98GH22', 'LED Fairy Lights 24ft', 'Decorative LED string lights for indoor/outdoor use', 2690.00, 'Home & Garden', 'Brighten', 'in_stock', 4.7, 'Canada', 'flipkart'),
('D55LK87', 'Himalayan Salt Lamp', 'Natural pink salt lamp with wooden base', 3250.00, 'Home & Garden', 'SaltCo', 'out_of_stock', 4.3, 'India', 'amazon');
