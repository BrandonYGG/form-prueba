import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Variables de entorno (Netlify las inyecta automáticamente)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hupqmcqeqpnbfmyrvhsf.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_SUPABASE_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const statusText = document.getElementById('upload-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    statusText.textContent = 'Selecciona un archivo primero.';
    return;
  }

  const filePath = `${Date.now()}_${file.name}`; // nombre único
  statusText.textContent = 'Subiendo...';

  const { data, error } = await supabase.storage
    .from('archivos') // nombre del bucket
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error(error);
    statusText.textContent = 'Error al subir el archivo ❌';
  } else {
    const { data: publicUrlData } = supabase.storage
      .from('archivos')
      .getPublicUrl(filePath);

    statusText.textContent = `✅ Archivo subido: ${publicUrlData.publicUrl}`;
    console.log('URL pública:', publicUrlData.publicUrl);
  }
});
