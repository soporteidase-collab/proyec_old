// src/pages/auth/LoginMinimal.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link as MLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { login } from "@/services/authService";
import axios from "axios";
import logoUrl from "@/assets/images/logo-horizontal.png";

export default function LoginMinimal() {
  const navigate = useNavigate();
  const { setUser /*, refreshUser*/ } = useAuth();

  const [email, setEmail] = useState("admin@colegioabogados.pe");
  const [password, setPassword] = useState("Password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Autenticación en tu backend (Sanctum)
      const { token, user } = await login(email, password);

      // Persistir token y cabecera Authorization
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Actualizar contexto con el usuario retornado
      setUser(user);

      // Si prefieres refrescar desde /user en vez de usar el user del login:
      // await refreshUser();

      // Redirección por rol
      const roles = Array.isArray((user as any)?.roles)
        ? (user as any).roles as string[]
        : [user?.role].filter(Boolean) as string[];

      if (roles.includes("abogado")) {
        navigate("/dashboard", { replace: true });
      } else if (roles.some((r) => ["admin", "editor", "colaborador"].includes(r))) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true }); // portal por defecto
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Credenciales incorrectas";
      setError(msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        p: 2,
        bgcolor: (t) => t.palette.grey[50],
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 520, boxShadow: 6, borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3} alignItems="center">
            {/* Logo arriba */}
            <Box
              component="img"
              src={logoUrl}
              alt="Colegio de Abogados"
              onError={() =>
                console.warn("No se pudo cargar src/assets/images/logo-horizontal.png")
              }
              sx={{ height: 72, width: "auto", display: "block", objectFit: "contain" }}
            />

            <Typography variant="h5" fontWeight={700}>
              Acceso al Sistema
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  {loading ? <CircularProgress size={22} /> : "Iniciar Sesión"}
                </Button>

                <Typography variant="caption" sx={{ opacity: 0.7, textAlign: "center" }}>
                  Usuario de prueba: admin@colegioabogados.pe / Password123
                </Typography>

                <Stack direction="row" justifyContent="space-between">
                  <MLink component={RouterLink} to="#" underline="hover" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </MLink>
                  <MLink component={RouterLink} to="/" underline="hover" variant="body2">
                    Ir al portal
                  </MLink>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
