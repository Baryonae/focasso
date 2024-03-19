import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://rtosdupdqhsrrxkntjwl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0b3NkdXBkcWhzcnJ4a250andsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzczMDgsImV4cCI6MjAyNjQxMzMwOH0.BmMfKrBB8xxp_AZNQJdnSXeP_MXUnTlFPVA_uyJxskU"
);
