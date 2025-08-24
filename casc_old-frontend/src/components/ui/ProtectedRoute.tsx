import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>; // Evita redirección prematura
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
