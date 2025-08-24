// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mientras se verifica el usuario, puedes mostrar un loader
  if (loading) {
    return <div>Cargando...</div>; // aquí puedes poner un spinner de MUI si quieres
  }

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si está autenticado, renderiza las rutas hijas
  return <Outlet />;
}
