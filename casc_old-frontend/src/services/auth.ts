// src/services/auth.ts
export const TOKEN_STORAGE_KEY = 'auth_token';
export const USER_STORAGE_KEY = 'auth_user';

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}
export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  sessionStorage.clear();
}

export async function apiLogout() {
  // Si tu backend usa cookie HttpOnly:
  // - endpoint de ejemplo: /api/auth/logout
  // - habilitar CORS con credentials en el backend
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // IMPORTANTE para borrar cookie
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    // noop: aunque falle, igual limpiaremos cliente
  }
}
