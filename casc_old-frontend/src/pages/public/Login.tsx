import { Container, CssBaseline } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoginForm />
    </Container>
  );
}