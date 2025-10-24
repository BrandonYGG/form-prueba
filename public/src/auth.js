import { supabase } from './supabaseClient.js';

export async function signUp(email, password, showMsg) {
  if(!email || !password) return showMsg('Llena correo y contraseña', true);
  showMsg('Registrando...');
  const { user, session, error } = await supabase.auth.signUp({ email, password });
  if(error) showMsg('Error: '+error.message, true);
  else showMsg('Registrado correctamente. Confirma tu correo.');
}

export async function signIn(email, password, showMsg) {
  if(!email || !password) return showMsg('Llena correo y contraseña', true);
  showMsg('Iniciando sesión...');
  const { user, session, error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) showMsg('Error: '+error.message, true);
  else showMsg('¡Sesión iniciada! ID: '+user.id);
}

export async function signOut(showMsg) {
  const { error } = await supabase.auth.signOut();
  if(error) showMsg('Error: '+error.message, true);
  else showMsg('Sesión cerrada correctamente.');
}
