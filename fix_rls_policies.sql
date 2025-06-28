-- Add policy to allow service role to insert products for scraping
CREATE POLICY "Allow service role to insert products for scraping" 
ON public.products 
FOR INSERT 
TO service_role 
WITH CHECK (true);

-- Allow service role to insert search results
CREATE POLICY "Allow service role to insert search results" 
ON public.search_results 
FOR INSERT 
TO service_role 
WITH CHECK (true);

-- Allow service role to insert search queries
CREATE POLICY "Allow service role to insert search queries" 
ON public.search_queries 
FOR INSERT 
TO service_role 
WITH CHECK (true);

-- Allow service role to insert messages
CREATE POLICY "Allow service role to insert messages" 
ON public.messages 
FOR INSERT 
TO service_role 
WITH CHECK (true);

-- Allow service role to insert chats
CREATE POLICY "Allow service role to insert chats" 
ON public.chats 
FOR INSERT 
TO service_role 
WITH CHECK (true);
