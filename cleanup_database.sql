-- =====================================================
-- CLEAN DATABASE SCRIPT (PRESERVE USER PROFILES ONLY)
-- =====================================================
-- This script deletes all data from all tables except user_profiles
-- Use with caution! This will remove all products, chats, orders, etc.
-- =====================================================

-- Start transaction to ensure data consistency
BEGIN;

-- Display what we're about to do
DO $$
BEGIN
    RAISE NOTICE '🚨 STARTING DATABASE CLEANUP...';
    RAISE NOTICE '📋 This will DELETE ALL DATA except user profiles';
    RAISE NOTICE '⏰ Started at: %', NOW();
END $$;

-- =====================================================
-- 1. DISABLE TRIGGERS AND CONSTRAINTS (if needed)
-- =====================================================
-- Uncomment these if you encounter foreign key constraint issues
-- SET session_replication_role = replica;

-- =====================================================
-- 2. DELETE DATA IN PROPER ORDER (respecting foreign keys)
-- =====================================================

-- Delete order-related data first (depends on products and users)
DO $$
DECLARE
    order_items_count INTEGER;
    orders_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO order_items_count FROM public.order_items;
    DELETE FROM public.order_items;
    RAISE NOTICE '✅ Deleted % order items', order_items_count;
    
    SELECT COUNT(*) INTO orders_count FROM public.orders;
    DELETE FROM public.orders;
    RAISE NOTICE '✅ Deleted % orders', orders_count;
END $$;

-- Delete cart and wishlist data
DO $$
DECLARE
    cart_count INTEGER;
    wishlist_items_count INTEGER;
    wishlists_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO cart_count FROM public.cart_items;
    DELETE FROM public.cart_items;
    RAISE NOTICE '✅ Deleted % cart items', cart_count;
    
    SELECT COUNT(*) INTO wishlist_items_count FROM public.wishlist_items;
    DELETE FROM public.wishlist_items;
    RAISE NOTICE '✅ Deleted % wishlist items', wishlist_items_count;
    
    SELECT COUNT(*) INTO wishlists_count FROM public.wishlists;
    DELETE FROM public.wishlists;
    RAISE NOTICE '✅ Deleted % wishlists', wishlists_count;
END $$;

-- Delete user behavior and interaction data
DO $$
DECLARE
    interactions_count INTEGER;
    reorder_count INTEGER;
    preferences_count INTEGER;
    notifications_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO interactions_count FROM public.product_interactions;
    DELETE FROM public.product_interactions;
    RAISE NOTICE '✅ Deleted % product interactions', interactions_count;
    
    SELECT COUNT(*) INTO reorder_count FROM public.reorder_suggestions;
    DELETE FROM public.reorder_suggestions;
    RAISE NOTICE '✅ Deleted % reorder suggestions', reorder_count;
    
    SELECT COUNT(*) INTO preferences_count FROM public.user_preferences;
    DELETE FROM public.user_preferences;
    RAISE NOTICE '✅ Deleted % user preferences', preferences_count;
    
    SELECT COUNT(*) INTO notifications_count FROM public.notifications;
    DELETE FROM public.notifications;
    RAISE NOTICE '✅ Deleted % notifications', notifications_count;
END $$;

-- Delete search and results data
DO $$
DECLARE
    search_results_count INTEGER;
    search_queries_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO search_results_count FROM public.search_results;
    DELETE FROM public.search_results;
    RAISE NOTICE '✅ Deleted % search results', search_results_count;
    
    SELECT COUNT(*) INTO search_queries_count FROM public.search_queries;
    DELETE FROM public.search_queries;
    RAISE NOTICE '✅ Deleted % search queries', search_queries_count;
END $$;

-- Delete chat and message data
DO $$
DECLARE
    messages_count INTEGER;
    chats_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO messages_count FROM public.messages;
    DELETE FROM public.messages;
    RAISE NOTICE '✅ Deleted % messages', messages_count;
    
    SELECT COUNT(*) INTO chats_count FROM public.chats;
    DELETE FROM public.chats;
    RAISE NOTICE '✅ Deleted % chats', chats_count;
END $$;

-- Delete product data last (many tables reference this)
DO $$
DECLARE
    products_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO products_count FROM public.products;
    DELETE FROM public.products;
    RAISE NOTICE '✅ Deleted % products', products_count;
END $$;

-- =====================================================
-- 3. RESET SEQUENCES (Optional)
-- =====================================================
-- Uncomment if you want to reset auto-increment sequences
-- This will make new records start from 1 again

/*
DO $$
DECLARE
    seq_record RECORD;
BEGIN
    FOR seq_record IN 
        SELECT sequence_name 
        FROM information_schema.sequences 
        WHERE sequence_schema = 'public'
    LOOP
        EXECUTE 'ALTER SEQUENCE public.' || seq_record.sequence_name || ' RESTART WITH 1';
        RAISE NOTICE '🔄 Reset sequence: %', seq_record.sequence_name;
    END LOOP;
END $$;
*/

-- =====================================================
-- 4. RE-ENABLE TRIGGERS AND CONSTRAINTS
-- =====================================================
-- Re-enable if you disabled them earlier
-- SET session_replication_role = DEFAULT;

-- =====================================================
-- 5. VERIFY CLEANUP
-- =====================================================
DO $$
DECLARE
    table_record RECORD;
    row_count INTEGER;
    total_rows INTEGER := 0;
    preserved_users INTEGER;
BEGIN
    RAISE NOTICE '📊 CLEANUP VERIFICATION:';
    RAISE NOTICE '========================';
    
    -- Check user profiles (should be preserved)
    SELECT COUNT(*) INTO preserved_users FROM public.user_profiles;
    RAISE NOTICE '👥 User profiles preserved: %', preserved_users;
    RAISE NOTICE '------------------------';
    
    -- Check all other tables (should be empty)
    FOR table_record IN
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND table_name != 'user_profiles'
        ORDER BY table_name
    LOOP
        EXECUTE 'SELECT COUNT(*) FROM public.' || table_record.table_name INTO row_count;
        total_rows := total_rows + row_count;
        
        IF row_count > 0 THEN
            RAISE NOTICE '⚠️  %: % rows remaining', table_record.table_name, row_count;
        ELSE
            RAISE NOTICE '✅ %: empty', table_record.table_name;
        END IF;
    END LOOP;
    
    RAISE NOTICE '------------------------';
    RAISE NOTICE '📈 Total non-user rows remaining: %', total_rows;
    RAISE NOTICE '👥 User profiles preserved: %', preserved_users;
    
    IF total_rows = 0 THEN
        RAISE NOTICE '🎉 CLEANUP SUCCESSFUL! All data removed except user profiles.';
    ELSE
        RAISE NOTICE '⚠️  Some data remains. Check the tables listed above.';
    END IF;
    
    RAISE NOTICE '⏰ Completed at: %', NOW();
END $$;

-- =====================================================
-- 6. COMMIT TRANSACTION
-- =====================================================
COMMIT;

-- =====================================================
-- ADDITIONAL CLEANUP QUERIES (Run separately if needed)
-- =====================================================

/*
-- If you also want to clean up Supabase Storage buckets (run separately):
-- Note: This requires superuser permissions or bucket owner access

-- List all files in storage
SELECT name, bucket_id, owner FROM storage.objects;

-- Delete all files from a specific bucket (replace 'your-bucket-name')
-- DELETE FROM storage.objects WHERE bucket_id = 'your-bucket-name';

-- If you have auth.users that are not referenced in user_profiles, clean them up:
-- DELETE FROM auth.users WHERE id NOT IN (SELECT id FROM public.user_profiles);
*/

-- =====================================================
-- USAGE INSTRUCTIONS
-- =====================================================

/*
HOW TO USE THIS SCRIPT:

1. **BACKUP FIRST!** Always backup your database before running this:
   pg_dump -h your-host -U your-user -d your-db > backup.sql

2. **Test Environment**: Run this on a test database first

3. **Execute the script**: 
   - Copy and paste this entire script into your SQL client
   - Or save as .sql file and run: psql -f cleanup_script.sql

4. **What gets deleted**:
   ✅ All products and product data
   ✅ All chats and messages  
   ✅ All orders and order items
   ✅ All cart items
   ✅ All wishlists and wishlist items
   ✅ All search queries and results
   ✅ All notifications
   ✅ All user preferences and interactions
   ❌ User profiles (PRESERVED)

5. **What's preserved**:
   👥 user_profiles table (all user accounts)
   🔐 auth.users table (authentication data)
   🗂️ Database schema and structure
   ⚙️ Functions, triggers, and policies

6. **After cleanup**:
   - Users can still log in
   - They'll see empty chat history
   - Cart will be empty
   - No saved products or orders
   - Fresh start for product data

SAFETY FEATURES:
- Wrapped in transaction (can rollback if needed)
- Respects foreign key constraints  
- Provides detailed progress feedback
- Verification step at the end
- Does not touch auth or system tables

*/
