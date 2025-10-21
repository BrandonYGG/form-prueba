// public/src/supabaseClient.js

// 🔹 URL de tu proyecto Supabase
const SUPABASE_URL = 'https://hupqmcqeqpnbfmyrvhsf.supabase.co';

// 🔹 Clave pública (anon) de Supabase
// Nota: En producción esta clave se debería proteger usando funciones serverless.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cHFtY3FlcXBuYmZteXJ2aHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTU1ODgsImV4cCI6MjA3NjYzMTU4OH0.jA5rinVSc06a4xKQR7tEmDvVU0Vq8avq72QwZ1C1LAg';

// 🔹 Crear cliente de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.35.0/dist/supabase.min.js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
