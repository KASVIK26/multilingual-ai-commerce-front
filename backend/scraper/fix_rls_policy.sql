-- Temporary fix to allow anonymous inserts for product scraping
-- This should be run in Supabase SQL editor or via psql

-- Add a policy to allow anonymous inserts to products table for scraping
CREATE POLICY "Allow anonymous product inserts for scraping" 
ON public.products 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Alternative: Allow inserts from authenticated service
-- CREATE POLICY "Allow service inserts" 
-- ON public.products 
-- FOR INSERT 
-- TO service_role 
-- WITH CHECK (true);
