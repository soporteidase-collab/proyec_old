import { createTheme } from '@mui/material/styles';

// Tema personalizado de Material UI
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul MUI por defecto
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0', // Morado
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Evita que los textos de botones se pongan en mayúsculas
        },
      },
    },
  },
});