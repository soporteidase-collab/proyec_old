// src/routes/RoleGuard.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, User } from '@/contexts/AuthContext';

function getUserRoles(u: User | null): string[] {
  if (!u) return [];
  if (Array.isArray(u.roles) && u.roles.length) {
    // type predicate para filtrar undefined
    return u.roles.filter((x): x is string => !!x);
  }
  return u.role ? [u.role] : [];
}

export default function RoleGuard({ allowed }: { allowed: string[] }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando…</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  const roles = getUserRoles(user);        // <-- siempre string[]
  if (!roles.some((r) => allowed.includes(r))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
