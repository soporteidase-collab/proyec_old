import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

const Contact: React.FC = () => {
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Gracias por contactarnos. Nos comunicaremos con usted pronto.');
  };

  return (
    <Box sx={{ py: 10, backgroundColor: theme.palette.grey[50], minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
        >
          Contáctanos
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
          Estamos aquí para atenderte. Completa el formulario y uno de nuestros asesores te responderá a la brevedad.
        </Typography>

        <Grid container spacing={4}>
          {/* Información contacto */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Colegio de Abogados de Selva Central
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Dirección:</strong> Jr. Arequipa 1234, Chanchamyo, Junín
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Teléfono:</strong> +51 01 234 5678
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Email:</strong> info@caselvacentral.pe
              </Typography>

              <Typography sx={{ mt: 4 }}>
                <strong>Horario de Atención:</strong><br />
                Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                Sábados: 9:00 AM - 1:00 PM
              </Typography>
            </Paper>
          </Grid>

          {/* Formulario de contacto */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Asunto"
                  name="subject"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Mensaje"
                  name="message"
                  multiline
                  rows={5}
                  variant="outlined"
                  margin="normal"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, fontWeight: 600 }}
                >
                  Enviar mensaje
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
