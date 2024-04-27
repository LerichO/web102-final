import { createClient } from "@supabase/supabase-js";

const URL = "https://ejdylhgzvsccqsjnbgzo.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZHlsaGd6dnNjY3Fzam5iZ3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTg0OTIsImV4cCI6MjAyOTczNDQ5Mn0.9izVHnJMfMabTFKkPkt57_Zi-ZvRQySYCJniLLnXs-4";

export const supabase = createClient(URL, API_KEY);
