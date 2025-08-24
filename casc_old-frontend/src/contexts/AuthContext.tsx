// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import axios, { AxiosError } from 'axios';
import { getCurrentUser } from '@/services/authService';

// 👉 Exporta el tipo para poder usarlo en otros archivos (p.ej. RoleGuard/authz)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;        // rol principal (admin | editor | colaborador | abogado)
  roles?: string[];    // opcional: array de roles si en el futuro usas Spatie
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const TOKEN_KEY = 'token';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setAxiosAuthHeader(token: string | null) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const userData = await getCurrentUser(); // GET /user
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post('/logout'); // auth:sanctum
    } catch {
      // si falla, igual limpiamos cliente
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setAxiosAuthHeader(null);
      setUser(null);
    }
  }, []);

  // Inicializa axios con token y carga usuario
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setAxiosAuthHeader(token);

    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await refreshUser();
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          setAxiosAuthHeader(null);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, [refreshUser]);

  // Interceptor global: en 401, logout suave
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (resp) => resp,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await logout();
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, [logout]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      setUser,
      logout,
      refreshUser,
    }),
    [user, loading, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
