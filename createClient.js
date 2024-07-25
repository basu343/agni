// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ztdnccmanmxylevmwoxa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZG5jY21hbm14eWxldm13b3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MDg2MjEsImV4cCI6MjAzNDk4NDYyMX0.DwWXkmlznaiMxFpxXWFJpD1DHHImYA9JI5mpKYxOnwU";
export const supabase = createClient(supabaseUrl, supabaseKey);
