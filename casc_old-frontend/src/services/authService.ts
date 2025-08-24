// src/services/authService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    roles?: string[]; // opcional si devuelves múltiples roles
  };
}

// 🔹 Login: recibe email y password, retorna { token, user }
export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(`${API_URL}/login`, {
    email,
    password,
  });
  return data;
}

// 🔹 Obtener usuario autenticado desde el backend
export async function getCurrentUser() {
  const { data } = await axios.get(`${API_URL}/user`);
  return data;
}

// 🔹 Cerrar sesión en el backend
export async function logout() {
  await axios.post(`${API_URL}/logout`);
}
