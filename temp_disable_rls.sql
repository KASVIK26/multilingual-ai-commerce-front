-- Temporary fix: Disable RLS on products table for testing
-- Run this in Supabase SQL Editor temporarily

ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing with:
-- ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
