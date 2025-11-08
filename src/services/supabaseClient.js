import { createClient } from '@supabase/supabase-js';

// *** CREDENCIALES FINALES ***
// Usando la clave completa y actualizada para resolver el error 401
const supabaseUrl = 'https://evgykiyuirkjxppqvfjt.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3lraXl1aXJranhwcXF2Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NjI3NTAsImV4cCI6MjA3ODEzODc1MH0.6wuT3NtmeRBHxkZxCTwrrGzJPjWEw39WIg9qOhVtIHs'; 

// Exportamos el cliente único para usarlo en toda la aplicación
export const supabase = createClient(supabaseUrl, supabaseKey);