import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface DrawerMenuProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

export default function DrawerMenu({ mobileOpen, onClose }: DrawerMenuProps) {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      </List>
    </Drawer>
  );
}
