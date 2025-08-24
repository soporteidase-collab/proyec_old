import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  useTheme,
  Paper,
  Chip
} from '@mui/material';


import { Grid } from '@mui/material'; // Añadir Grid aquí

import { 
  Gavel as GavelIcon, 
  Balance as BalanceIcon, 
  HistoryEdu as HistoryEduIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const About: React.FC = () => {
  const theme = useTheme();

  const historyItems = [
    { year: '1950', title: 'Fundación', description: 'Creación del Colegio de Abogados de Selva Central bajo decreto presidencial.' },
    { year: '1965', title: 'Primera Sede', description: 'Inauguración de la primera sede institucional en el centro de la Selva Central.' },
    { year: '1980', title: 'Expansión', description: 'Apertura de 5 sedes regionales en todo el país.' },
    { year: '2000', title: 'Reconocimiento', description: 'Premio Nacional a la Excelencia Institucional.' },
    { year: '2020', title: 'Modernización', description: 'Implementación de sistemas digitales para la gestión de colegiados.' },
  ];

  const boardMembers = [
    { name: 'Dr. Javier Mendoza', role: 'Decano', experience: '25 años', specialty: 'Derecho Civil' },
    { name: 'Dra. Luisa Fernández', role: 'Vicedecana', experience: '22 años', specialty: 'Derecho Penal' },
    { name: 'Dr. Carlos Rodríguez', role: 'Secretario General', experience: '20 años', specialty: 'Derecho Laboral' },
    { name: 'Dra. Ana Pérez', role: 'Tesorera', experience: '18 años', specialty: 'Derecho Comercial' },
  ];

  const values = [
    { icon: <BalanceIcon fontSize="large" />, title: 'Justicia', description: 'Defendemos la justicia como pilar fundamental de la sociedad.' },
    { icon: <GavelIcon fontSize="large" />, title: 'Ética', description: 'Actuamos con integridad y rectitud en todas nuestras acciones.' },
    { icon: <PeopleIcon fontSize="large" />, title: 'Solidaridad', description: 'Trabajamos en beneficio de nuestros colegiados y la comunidad.' },
    { icon: <SchoolIcon fontSize="large" />, title: 'Excelencia', description: 'Buscamos la mejora continua y la calidad en nuestros servicios.' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/src/assets/images/law-books.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 15,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Colegio de Abogados de Selva Central
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Más de 70 años sirviendo a la comunidad jurídica peruana
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{ px: 5, fontWeight: 600, boxShadow: '0 4px 12px rgba(25, 118, 210, 0.5)' }}
          >
            Contáctanos
          </Button>
        </Container>
      </Box>

      {/* Sección de Introducción */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Nuestra Misión
            </Typography>
            <Typography variant="body1" paragraph>
              El Colegio de Abogados de Selva Central tiene como misión fundamental promover la excelencia profesional 
              en el ejercicio del derecho, defender los principios éticos de la abogacía, y representar 
              los intereses legítimos de nuestros colegiados ante las instituciones públicas y privadas.
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
              Nuestra Visión
            </Typography>
            <Typography variant="body1" paragraph>
              Aspiramos a ser reconocidos como la institución líder en la promoción del desarrollo profesional 
              de los abogados peruanos, contribuyendo a la consolidación de un sistema de justicia independiente, 
              eficiente y accesible para todos los ciudadanos.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              height: 400,
              backgroundImage: 'url("/src/assets/images/courtroom.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </Grid>
        </Grid>
      </Container>

      {/* Sección de Historia */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <HistoryEduIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Nuestra Historia
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
              Una trayectoria de excelencia y servicio a la comunidad jurídica peruana
            </Typography>
          </Box>
          <Box sx={{ 
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2,
              backgroundColor: theme.palette.primary.main,
              [theme.breakpoints.down('md')]: {
                display: 'none'
              }
            }
          }}>
            {historyItems.map((item, index) => (
              <Grid 
                container 
                key={index} 
                sx={{ mb: 8, position: 'relative', alignItems: 'center' }}
              >
                <Grid 
                  size={{ xs: 12, md: index % 2 === 0 ? 5 : 7 }}
                  sx={{ 
                    order: { xs: 2, md: index % 2 === 0 ? 1 : 2 },
                    textAlign: { xs: 'center', md: index % 2 === 0 ? 'right' : 'left' },
                    px: 4
                  }}
                >
                  <Box sx={{ 
                    p: 3,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 2,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      [index % 2 === 0 ? 'right' : 'left']: -15,
                      width: 30,
                      height: 30,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      transform: 'translateY(-50%)',
                      [theme.breakpoints.down('md')]: {
                        display: 'none'
                      }
                    }
                  }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Chip 
                      label={item.year} 
                      color="primary" 
                      sx={{ mb: 2, fontWeight: 600 }} 
                    />
                    <Typography>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid 
                  size={{ xs: 12, md: 2 }} 
                  sx={{ 
                    order: { xs: 1, md: 2 },
                    textAlign: 'center',
                    mb: { xs: 2, md: 0 }
                  }}
                >
                  <Box sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    boxShadow: 3
                  }}>
                    {item.year}
                  </Box>
                </Grid>
                
                <Grid 
                  size={{ xs: 12, md: index % 2 === 0 ? 5 : 3 }}
                  sx={{ order: { xs: 3, md: 3 } }} 
                />
              </Grid>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Sección de Valores */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <StarIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Nuestros Valores
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
            Principios que guían nuestra labor institucional
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                boxShadow: 3,
                borderTop: `4px solid ${theme.palette.primary.main}`,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)'
                }
              }}>
                <Box sx={{ 
                  backgroundColor: theme.palette.primary.light, 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3
                }}>
                  {value.icon}
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección del Consejo Directivo */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <PeopleIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Consejo Directivo
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
              Profesionales comprometidos con el desarrollo de la institución
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {boardMembers.map((member, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Paper elevation={3} sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <Box sx={{ 
                    height: 200,
                    backgroundImage: `url('/src/assets/images/team${index + 1}.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Chip 
                      label={member.role} 
                      color="primary" 
                      size="small"
                      sx={{ mb: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      <WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {member.experience} de experiencia
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <SchoolIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Especialidad: {member.specialty}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Llamada a la acción */}
      <Box sx={{ 
        backgroundImage: 'linear-gradient(rgba(25, 118, 210, 0.9), rgba(25, 118, 210, 0.9))',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            ¿Eres abogado y aún no estás colegiado?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Únete a nuestra institución y accede a todos los beneficios exclusivos para colegiados
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            component={RouterLink}
            to="/registro"
            sx={{ px: 5, fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          >
            Registrarme ahora
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
