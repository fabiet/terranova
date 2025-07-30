@@ .. @@
 -- Enable RLS on contact_messages table
 ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
 
--- Create policy to allow anyone to insert contact messages
-CREATE POLICY "Anyone can submit contact messages" ON contact_messages
-  FOR INSERT WITH CHECK (true);
+-- Create policy to allow anonymous users to insert contact messages
+CREATE POLICY "Allow public contact form submissions" ON contact_messages
+  FOR INSERT TO anon WITH CHECK (true);
 
 -- Create users table
 CREATE TABLE IF NOT EXISTS users (