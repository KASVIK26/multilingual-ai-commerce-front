
-- =====================================================
-- COMPLETE SUPABASE SCHEMA WITH POLICIES & STORAGE
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE (extends auth.users)
-- =====================================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10),
  language_preference VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'UTC',
  notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
  preferences JSONB DEFAULT '{}'::jsonb,
  is_premium BOOLEAN DEFAULT FALSE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. PRODUCTS TABLE
-- =====================================================

CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id VARCHAR(100) UNIQUE NOT NULL, -- External product ID from scraper
  name VARCHAR(500) NOT NULL,
  description TEXT,
  short_description VARCHAR(200),
  price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2),
  discount_percentage DECIMAL(5, 2),
  currency VARCHAR(3) DEFAULT 'INR',
  category VARCHAR(100),
  subcategory VARCHAR(100),
  tags TEXT[],
  brand VARCHAR(100),
  model VARCHAR(100),
  sku VARCHAR(100),
  images TEXT[],
  image_url TEXT,
  product_url TEXT,
  affiliate_url TEXT,
  availability_status VARCHAR(50) DEFAULT 'in_stock', -- in_stock, low_stock, out_of_stock, discontinued
  stock_quantity INTEGER,
  rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  specifications JSONB,
  features TEXT[],
  dimensions JSONB, -- {"length": 10, "width": 5, "height": 3, "weight": 2.5, "unit": "cm"}
  color VARCHAR(50),
  size VARCHAR(50),
  material VARCHAR(100),
  warranty_info TEXT,
  shipping_info JSONB,
  return_policy TEXT,
  region VARCHAR(100),
  country VARCHAR(100),
  platform VARCHAR(50), -- amazon, flipkart, myntra, etc.
  seller_name VARCHAR(200),
  seller_rating DECIMAL(3, 2),
  platform_specific_data JSONB,
  search_vector TSVECTOR,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. CHATS TABLE
-- =====================================================

CREATE TABLE public.chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255),
  summary TEXT,
  status VARCHAR(20) DEFAULT 'active', -- active, archived, deleted
  language VARCHAR(10) DEFAULT 'en',
  chat_type VARCHAR(50) DEFAULT 'general', -- general, product_search, support, recommendation
  context JSONB, -- Store search context, filters, etc.
  metadata JSONB,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. MESSAGES TABLE
-- =====================================================

CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text', -- text, product_list, product_card, action, image, file
  metadata JSONB, -- Store product IDs, search filters, attachments, etc.
  attachments JSONB, -- File URLs, image URLs, etc.
  tokens_used INTEGER,
  processing_time_ms INTEGER,
  model_used VARCHAR(100),
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP WITH TIME ZONE,
  parent_message_id UUID REFERENCES public.messages(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. SEARCH QUERIES & NLP
-- =====================================================

CREATE TABLE public.search_queries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  original_query TEXT NOT NULL,
  processed_query TEXT,
  extracted_features JSONB, -- NLP extracted: category, price_range, brand, color, etc.
  search_filters JSONB, -- Converted filters for scraper
  search_intent VARCHAR(100), -- product_search, comparison, recommendation, etc.
  query_language VARCHAR(10) DEFAULT 'en',
  results_count INTEGER DEFAULT 0,
  search_duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. SEARCH RESULTS
-- =====================================================

CREATE TABLE public.search_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  search_query_id UUID REFERENCES public.search_queries(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  relevance_score DECIMAL(5, 4), -- 0.0000 to 1.0000
  position_in_results INTEGER,
  match_reasons TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(search_query_id, product_id)
);

-- =====================================================
-- 7. SHOPPING CART
-- =====================================================

CREATE TABLE public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price_at_addition DECIMAL(12, 2) NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  custom_options JSONB,
  notes TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id, size, color)
);

-- =====================================================
-- 8. ORDERS & ORDER ITEMS
-- =====================================================

CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled, refunded
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded, partial_refund
  total_amount DECIMAL(12, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  shipping_amount DECIMAL(12, 2) DEFAULT 0,
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'INR',
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  payment_method VARCHAR(50),
  payment_details JSONB,
  tracking_number VARCHAR(100),
  shipping_carrier VARCHAR(100),
  order_notes TEXT,
  internal_notes TEXT,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name VARCHAR(500) NOT NULL,
  product_description TEXT,
  product_image_url TEXT,
  product_url TEXT,
  sku VARCHAR(100),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  custom_options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. USER PREFERENCES & BEHAVIOR
-- =====================================================

CREATE TABLE public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  preferred_categories TEXT[],
  preferred_brands TEXT[],
  preferred_colors TEXT[],
  preferred_sizes TEXT[],
  price_range_min DECIMAL(12, 2),
  price_range_max DECIMAL(12, 2),
  preferred_regions TEXT[],
  preferred_platforms TEXT[],
  excluded_brands TEXT[],
  excluded_categories TEXT[],
  notification_preferences JSONB,
  search_preferences JSONB,
  display_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- =====================================================
-- 10. PRODUCT INTERACTIONS
-- =====================================================

CREATE TABLE public.product_interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  interaction_type VARCHAR(50) NOT NULL, -- view, click, add_to_cart, purchase, like, share, compare
  interaction_duration INTEGER, -- in seconds for view interactions
  source VARCHAR(100), -- search, recommendation, chat, browse
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. WISHLISTS & FAVORITES
-- =====================================================

CREATE TABLE public.wishlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(200) NOT NULL DEFAULT 'My Wishlist',
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wishlist_id UUID REFERENCES public.wishlists(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  notes TEXT,
  priority INTEGER DEFAULT 1, -- 1-5 priority
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(wishlist_id, product_id)
);

-- =====================================================
-- 12. NOTIFICATIONS
-- =====================================================

CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- price_drop, back_in_stock, order_update, recommendation, system
  priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
  data JSONB, -- Additional data like product_id, order_id, etc.
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 13. REORDER SUGGESTIONS
-- =====================================================

CREATE TABLE public.reorder_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  last_ordered_at TIMESTAMP WITH TIME ZONE,
  order_frequency INTEGER, -- days between orders
  next_suggested_date DATE,
  priority_score DECIMAL(5, 4), -- 0.0000 to 1.0000
  status VARCHAR(20) DEFAULT 'active', -- active, dismissed, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- User profiles indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);

-- Products indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_platform ON public.products(platform);
CREATE INDEX idx_products_status ON public.products(availability_status);
CREATE INDEX idx_products_rating ON public.products(rating);
CREATE INDEX idx_products_search_vector ON public.products USING gin(search_vector);
CREATE INDEX idx_products_active ON public.products(is_active);

-- Chats indexes
CREATE INDEX idx_chats_user_id ON public.chats(user_id);
CREATE INDEX idx_chats_status ON public.chats(status);
CREATE INDEX idx_chats_last_message ON public.chats(last_message_at DESC);

-- Messages indexes
CREATE INDEX idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX idx_messages_role ON public.messages(role);

-- Search queries indexes
CREATE INDEX idx_search_queries_user_id ON public.search_queries(user_id);
CREATE INDEX idx_search_queries_chat_id ON public.search_queries(chat_id);
CREATE INDEX idx_search_queries_created_at ON public.search_queries(created_at DESC);

-- Search results indexes
CREATE INDEX idx_search_results_query_id ON public.search_results(search_query_id);
CREATE INDEX idx_search_results_product_id ON public.search_results(product_id);
CREATE INDEX idx_search_results_relevance ON public.search_results(relevance_score DESC);

-- Cart indexes
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON public.cart_items(product_id);

-- Orders indexes
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_order_date ON public.orders(order_date DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

-- Interactions indexes
CREATE INDEX idx_product_interactions_user_id ON public.product_interactions(user_id);
CREATE INDEX idx_product_interactions_product_id ON public.product_interactions(product_id);
CREATE INDEX idx_product_interactions_type ON public.product_interactions(interaction_type);
CREATE INDEX idx_product_interactions_created_at ON public.product_interactions(created_at DESC);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for tables with updated_at columns
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON public.chats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reorder_suggestions_updated_at BEFORE UPDATE ON public.reorder_suggestions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wishlists_updated_at BEFORE UPDATE ON public.wishlists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reorder_suggestions ENABLE ROW LEVEL SECURITY;

-- Products table - read-only for users, admin access for management
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Products Policies (public read access)
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Chats Policies
CREATE POLICY "Users can view own chats" ON public.chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own chats" ON public.chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chats" ON public.chats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chats" ON public.chats FOR DELETE USING (auth.uid() = user_id);

-- Messages Policies
CREATE POLICY "Users can view messages in own chats" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chats WHERE chats.id = messages.chat_id AND chats.user_id = auth.uid())
);
CREATE POLICY "Users can create messages in own chats" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.chats WHERE chats.id = messages.chat_id AND chats.user_id = auth.uid())
);

-- Search Queries Policies
CREATE POLICY "Users can view own search queries" ON public.search_queries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own search queries" ON public.search_queries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Search Results Policies
CREATE POLICY "Users can view search results for own queries" ON public.search_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.search_queries WHERE search_queries.id = search_results.search_query_id AND search_queries.user_id = auth.uid())
);

-- Cart Policies
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders Policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items Policies
CREATE POLICY "Users can view items in own orders" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- User Preferences Policies
CREATE POLICY "Users can manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);

-- Product Interactions Policies
CREATE POLICY "Users can manage own interactions" ON public.product_interactions FOR ALL USING (auth.uid() = user_id);

-- Wishlists Policies
CREATE POLICY "Users can manage own wishlists" ON public.wishlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view public wishlists" ON public.wishlists FOR SELECT USING (is_public = true);

-- Wishlist Items Policies
CREATE POLICY "Users can manage items in own wishlists" ON public.wishlist_items FOR ALL USING (
  EXISTS (SELECT 1 FROM public.wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
);

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Reorder Suggestions Policies
CREATE POLICY "Users can view own reorder suggestions" ON public.reorder_suggestions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own reorder suggestions" ON public.reorder_suggestions FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Insert storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('product-images', 'product-images', true),
('attachments', 'attachments', false),
('documents', 'documents', false);

-- Storage Policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage Policies for product-images bucket
CREATE POLICY "Product images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- Storage Policies for attachments bucket
CREATE POLICY "Users can view their own attachments" ON storage.objects FOR SELECT USING (
  bucket_id = 'attachments' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can upload their own attachments" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'attachments' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- =====================================================
-- FUNCTIONS FOR SEARCH AND RECOMMENDATIONS
-- =====================================================

-- Function to update product search vector
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector = 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.brand, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.category, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.subcategory, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.tags, ' '), '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update search vector on product changes
CREATE TRIGGER update_product_search_vector_trigger
BEFORE INSERT OR UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- Function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Create default wishlist
  INSERT INTO public.wishlists (user_id, name, is_default)
  VALUES (NEW.id, 'My Wishlist', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Sample products (run after schema creation)
INSERT INTO public.products (product_id, name, description, price, category, brand, availability_status, rating, region, platform, tags, images) VALUES
('ELECTRONICS001', 'Apple iPhone 15 Pro Max 256GB', 'Latest iPhone with titanium build and A17 Pro chip', 134900.00, 'Electronics', 'Apple', 'in_stock', 4.8, 'India', 'amazon', ARRAY['smartphone', 'ios', 'camera', 'titanium'], ARRAY['https://example.com/iphone1.jpg', 'https://example.com/iphone2.jpg']),
('FASHION001', 'Nike Air Force 1 White Sneakers', 'Classic white sneakers for everyday wear', 7995.00, 'Fashion', 'Nike', 'in_stock', 4.6, 'India', 'myntra', ARRAY['shoes', 'sneakers', 'white', 'casual'], ARRAY['https://example.com/nike1.jpg']),
('HOME001', 'Philips Air Fryer HD9200/90', '4.1L Digital Touch Panel Air Fryer', 12995.00, 'Home & Kitchen', 'Philips', 'low_stock', 4.4, 'India', 'flipkart', ARRAY['kitchen', 'airfryer', 'cooking', 'healthy'], ARRAY['https://example.com/airfryer1.jpg']),
('BOOKS001', 'Atomic Habits by James Clear', 'Life-changing book about building good habits', 599.00, 'Books', 'Random House', 'in_stock', 4.9, 'India', 'amazon', ARRAY['self-help', 'productivity', 'habits', 'bestseller'], ARRAY['https://example.com/book1.jpg']);
