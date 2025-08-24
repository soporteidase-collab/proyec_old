import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Link, 
  useTheme, 
  IconButton 
} from '@mui/material';
import HeroSlider from '@/components/ui/HeroSlider';
import { Link as RouterLink } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArticleIcon from '@mui/icons-material/Article';
import CampaignIcon from '@mui/icons-material/Campaign';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Home: React.FC = () => {
  const theme = useTheme();

  // Datos simulados: reemplaza por consumo desde tu backend para dinamismo
  const newsItems = [
    { id: 1, title: 'Reforma judicial aprobada', date: '2025-07-25', excerpt: 'El Congreso aprobó nuevas reformas para agilizar procesos judiciales.' },
    { id: 2, title: 'Nuevo convenio con universidad', date: '2025-07-20', excerpt: 'Se firmó convenio para prácticas profesionales de estudiantes de derecho.' },
    { id: 3, title: 'Capacitación gratuita para colegiados', date: '2025-07-18', excerpt: 'Inicia ciclo de seminarios virtuales sin costo para miembros del CAL.' },
  ];

  const officialStatements = [
    { id: 1, title: 'Declaración sobre elecciones internas', date: '2025-07-22', excerpt: 'El CAL informa el calendario oficial y protocolos para las próximas elecciones.' },
    { id: 2, title: 'Comunicado sobre código de ética', date: '2025-07-15', excerpt: 'Se establece nueva directiva para actualización del código de ética profesional.' },
  ];

  const actions = [
    { id: 1, label: 'Pago online e impresión', icon: <PaymentIcon />, to: '/pago-online' },
    { id: 2, label: 'Consulta de deuda', icon: <SearchIcon />, to: '/consulta-deuda' },
    { id: 3, label: 'Consulta de habilidad', icon: <ArticleIcon />, to: '/consulta-habilidad' },
    { id: 4, label: 'Nuevas incorporaciones', icon: <PersonAddIcon />, to: '/nuevas-incorporaciones' },
  ];

  return (
    <Box>

      {/* 1. Slider full width */}
      <Box

  component="section"
  sx={{
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    overflow: 'hidden',
    zIndex: 0,
    mt: 0,
    pt: 0,
  }}
>

        <HeroSlider slides={[
          {
            id: 1,
            image: '/src/assets/images/slide1.jpg',
            title: 'Colegio de Abogados de Selva Central',
            subtitle: 'Excelencia profesional al servicio de la justicia'
          },
          {
            id: 2,
            image: '/src/assets/images/slide2.jpg',
            title: 'Comunidad Jurídica',
            subtitle: 'Conectando profesionales del derecho'
          },
          {
            id: 3,
            image: '/src/assets/images/slide3.jpg',
            title: 'Desarrollo Profesional',
            subtitle: 'Cursos, seminarios y certificaciones'
          }
        ]} />
      </Box>

      {/* 2. Botones de llamada a la acción */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          {actions.map(({ id, label, icon, to }) => (
            <Grid key={id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                component={RouterLink}
                to={to}
                variant="contained"
                color="primary"
                startIcon={icon}
                fullWidth
                sx={{
                  p: 3,
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}66`,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: `0 6px 16px ${theme.palette.primary.dark}aa`,
                  }
                }}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Últimas Noticias (dinámico) */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Entérate de lo que sucede en nuestra ilustre institución
          </Typography>
          <Grid container spacing={4}>
            {newsItems.map(({ id, title, date, excerpt }) => (
              <Grid key={id} size={{ xs: 12, md: 4 }}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(date).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>{excerpt}</Typography>
                  <Button 
                    component={RouterLink} 
                    to={`/noticias/${id}`} 
                    size="small" 
                    sx={{ mt: 2, alignSelf: 'flex-start' }}
                  >
                    Leer más
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Comunicados Oficiales (dinámico) */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Comunicados Oficiales
        </Typography>
        <Grid container spacing={4}>
          {officialStatements.map(({ id, title, date, excerpt }) => (
            <Grid key={id} size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <CampaignIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {new Date(date).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <Typography variant="body2">{excerpt}</Typography>
                <Button
                  component={RouterLink}
                  to={`/comunicados/${id}`}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Leer más
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
