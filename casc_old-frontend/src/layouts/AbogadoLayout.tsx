// src/layouts/AbogadoLayout.tsx
import React, { useCallback, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Dashboard, Receipt, HowToVote, Person, Logout, Home } from '@mui/icons-material';
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const drawerWidth = 240;

export default function AbogadoLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  const menu = [
    { text: 'Mi Panel', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Mis Pagos', icon: <Receipt />, path: '/dashboard/pagos' },
    { text: 'Votaciones', icon: <HowToVote />, path: '/dashboard/votaciones' },
    { text: 'Mi Perfil', icon: <Person />, path: '/dashboard/perfil' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar superior */}
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700}>
            Panel del Abogado
          </Typography>

          <Box>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
              sx={{ ml: 1 }}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.name?.slice(0, 1)?.toUpperCase() ?? 'U'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                component={RouterLink}
                to="/"
                onClick={() => setAnchorEl(null)}
              >
                <Home fontSize="small" style={{ marginRight: 8 }} />
                Ir al portal
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setOpenConfirm(true);
                }}
              >
                <Logout fontSize="small" style={{ marginRight: 8 }} />
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Toolbar />
        <List disablePadding>
          {menu.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  '&.active': { backgroundColor: 'action.selected' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 3 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">{item.text}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Diálogo de confirmación de logout */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>¿Cerrar sesión?</DialogTitle>
        <DialogContent>
          Se cerrará tu sesión actual y volverás a la pantalla de inicio de sesión.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              setOpenConfirm(false);
              handleLogout();
            }}
            variant="contained"
          >
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
