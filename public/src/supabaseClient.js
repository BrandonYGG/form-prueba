// public/src/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Tu proyecto Supabase
const SUPABASE_URL = 'https://hupqmcqeqpnbfmyrvhsf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cHFtY3FlcXBuYmZteXJ2aHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTU1ODgsImV4cCI6MjA3NjYzMTU4OH0.jA5rinVSc06a4xKQR7tEmDvVU0Vq8avq72QwZ1C1LAg';

// Crear el cliente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);










