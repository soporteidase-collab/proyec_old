import * as React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface AppBarProps {
  onMenuClick?: () => void;
  isAdmin?: boolean;
}

export default function AppBar({ onMenuClick, isAdmin = false }: AppBarProps) {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        {/* Botón de menú solo en vista admin */}
        {isAdmin && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Mi Aplicación
          </Button>
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" sx={{ alignSelf: 'center', mr: 2 }}>
                Hola, {user?.name}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
