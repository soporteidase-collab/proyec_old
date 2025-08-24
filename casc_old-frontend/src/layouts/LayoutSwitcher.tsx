import { useAuth } from '@/contexts/AuthContext';
import PublicLayout from './PublicLayout';
import AdminLayout from './AdminLayout';
import AbogadoLayout from './AbogadoLayout';

export default function LayoutSwitcher({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // Estado de carga
  
  if (!isAuthenticated) return <PublicLayout>{children}</PublicLayout>;

  switch (user?.role) {
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    case 'abogado':
      return <AbogadoLayout>{children}</AbogadoLayout>;
    default:
      return <PublicLayout>{children}</PublicLayout>;
  }
}
