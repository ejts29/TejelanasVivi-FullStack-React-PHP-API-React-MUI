// src/services/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evgykiyuirkjxppqvfjt.supabase.co'; 
// CLAVE MÁS RECIENTE:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3lraXl1aXJranhwcHF2Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NjI3NTAsImV4cCI6MjA3ODEzODc1MH0.6wuT3NtmeRBHxkZxCTwrrGzJPjWEw39WIg9qOhVtIHs'; 

export const supabase = createClient(supabaseUrl, supabaseKey);