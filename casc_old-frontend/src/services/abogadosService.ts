// src/services/abogadosService.ts
import axios from 'axios';

export interface AbogadoCore {
  id?: number;
  numero_colegiatura: string;
  dni: string;
  nombres: string;
  apellidos: string;
  especialidad?: string | null;
  email: string;
  habilitado_hasta: string; // ISO
  activo: boolean;
  user_id?: number;
}

export interface UserCore {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'editor' | 'colaborador' | 'abogado';
}

export interface AbogadoWithUser extends AbogadoCore {
  user?: Pick<UserCore, 'id' | 'name' | 'email' | 'role'>;
}

export interface CreatePayload extends AbogadoCore {
  user: Required<Pick<UserCore, 'name' | 'email' | 'password' | 'role'>>;
}

export interface UpdatePayload extends Partial<AbogadoCore> {
  user?: Partial<UserCore>; // password opcional
}

export interface Paginated<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
}

export async function listAbogados(params: any) {
  const { data } = await axios.get('/api/abogados', { params });
  const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
  const total = typeof data?.total === 'number' ? data.total : list.length;
  return { data: list, total };
}

export async function createAbogado(payload: any) {
  const { data } = await axios.post('/api/abogados', payload);
  return data;
}

export async function updateAbogado(id: number, payload: any) {
  const { data } = await axios.put(`/api/abogados/${id}`, payload);
  return data;
}

export async function removeAbogado(id: number) {
  const { data } = await axios.delete(`/api/abogados/${id}`);
  return data;
}