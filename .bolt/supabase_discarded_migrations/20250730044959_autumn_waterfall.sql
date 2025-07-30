@@ .. @@
 ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
 
--- Allow anyone to submit contact messages
-CREATE POLICY "Anyone can submit contact messages"
+-- Allow public (anonymous) users to submit contact messages
+CREATE POLICY "Allow public contact form submissions"
   ON contact_messages
-  FOR INSERT TO anon
-  WITH CHECK (true);
+  FOR INSERT
+  WITH CHECK (true);
 
 -- Allow authenticated users to read contact messages (for admin purposes)
 CREATE POLICY "Authenticated users can read contact messages"