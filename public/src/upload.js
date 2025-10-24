// authAndUpload.js
import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const submitBtn = document.getElementById('submitBtn');
  const fetchBtn = document.getElementById('fetchBtn');
  const clearBtn = document.getElementById('clearBtn');
  const messages = document.getElementById('messages');
  const listContainer = document.getElementById('listContainer');
  const usersTableBody = document.querySelector('#usersTable tbody');

  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');

  function showMsg(txt, isError=false) {
    messages.textContent = txt;
    messages.style.color = isError ? 'crimson' : '#2b6cb0';
  }

  function escapeHtml(str='') {
    return String(str)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'","&#039;");
  }

  // -----------------------
  // Registrar usuario
  // -----------------------
  submitBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if(!name || !email) return showMsg('Llena nombre y correo', true);

    showMsg('Enviando...');
    const { data, error } = await supabase
      .from('users_test')
      .insert([{ name, email }])
      .select();

    if(error) showMsg('Error: '+error.message, true);
    else {
      showMsg('Guardado ID: ' + (data?.[0]?.id ?? '—'));
      nameInput.value = '';
      emailInput.value = '';
    }
  });

  // -----------------------
  // Traer usuarios
  // -----------------------
  fetchBtn.addEventListener('click', async () => {
    showMsg('Cargando usuarios...');
    const { data, error } = await supabase
      .from('users_test')
      .select('*')
      .order('created_at', { ascending:false })
      .limit(100);

    if(error) return showMsg('Error al traer usuarios: '+error.message, true);

    usersTableBody.innerHTML = '';
    if(!data || data.length===0) usersTableBody.innerHTML='<tr><td colspan="4">No hay registros</td></tr>';
    else data.forEach(u=>{
      const row = document.createElement('tr');
      row.innerHTML = `<td>${u.id}</td><td>${escapeHtml(u.name)}</td><td>${escapeHtml(u.email)}</td><td>${u.created_at}</td>`;
      usersTableBody.appendChild(row);
    });
    listContainer.style.display='block';
    showMsg('Usuarios cargados: '+(data?.length ?? 0));
  });

  clearBtn.addEventListener('click', ()=>{
    usersTableBody.innerHTML='';
    listContainer.style.display='none';
    messages.textContent='';
  });

  // -----------------------
  // Subir archivo
  // -----------------------
  uploadBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if(!file) return showMsg('Selecciona un archivo', true);

    showMsg('Subiendo archivo...');
    const { data, error } = await supabase
      .storage
      .from('archivos') // nombre del bucket
      .upload(`${Date.now()}_${file.name}`, file, { cacheControl:'3600', upsert:true });

    if(error) showMsg('Error al subir: '+error.message, true);
    else {
      const { data: publicUrlData } = supabase.storage
        .from('archivos')
        .getPublicUrl(data.path);
      showMsg('¡Archivo subido!: '+publicUrlData.publicUrl);
    }
  });

});

