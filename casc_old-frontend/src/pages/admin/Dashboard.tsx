import { Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.name}
      </Typography>
      <Typography variant="body1">
        Este es tu panel de administración.
      </Typography>
    </>
  );
}