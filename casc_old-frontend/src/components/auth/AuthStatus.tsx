import { useAuth } from '@/contexts/AuthContext';
import { Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthStatus() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Tu lógica de logout aquí
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {isAuthenticated ? (
        <>
          <Typography variant="subtitle1">
            {user?.name}
          </Typography>
          <Button 
            variant="outlined" 
            color="inherit"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </>
      ) : (
        <Button 
          component={Link}
          to="/login"
          color="inherit"
          variant="outlined"
        >
          Iniciar sesión
        </Button>
      )}
    </Box>
  );
}