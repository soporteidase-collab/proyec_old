// src/layouts/PublicLayout.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
  Link,
  Slide,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom"; // ⬅️ Outlet aquí
import { useAuth } from "@/contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

/** Hook local: detecta dirección de scroll y valor Y actual */
type Direction = "up" | "down";
function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<Direction>("up");
  const [y, setY] = useState<number>(0);
  const lastY = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    setY(window.scrollY);

    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - lastY.current);
      if (diff < threshold) return;

      const newDir: Direction = currentY > lastY.current ? "down" : "up";
      lastY.current = currentY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setDirection(newDir);
          setY(currentY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, y };
}

export default function PublicLayout() { // ⬅️ sin children
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { direction, y } = useScrollDirection(8);

  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  // Roles del usuario (string[])
  const roles: string[] = Array.isArray((user as any)?.roles)
    ? ((user as any).roles as string[]).filter(Boolean)
    : (user?.role ? [user.role] : []);

  const canAdmin = roles.some((r) => ["admin", "editor", "colaborador"].includes(r));
  const isAbogado = roles.includes("abogado");

  // Evita ocultar el AppBar muy cerca del top
  const hideThreshold = 80;
  const showAppBar = useMemo(() => {
    const aboveTop = y < hideThreshold;
    return direction === "up" || aboveTop;
  }, [direction, y]);

  // Color del badge por rol principal
  const primaryRole = roles[0];
  const roleBg = (() => {
    if (primaryRole === "admin") return "#d32f2f";
    if (primaryRole === "editor") return "#1976d2";
    if (primaryRole === "colaborador") return "#0288d1";
    if (primaryRole === "abogado") return "#388e3c";
    return "#757575";
  })();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* AppBar ocultable */}
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar position="sticky" elevation={0} color="primary" sx={{ mb: 0, pb: 0, boxShadow: "none" }}>
          <Toolbar sx={{ justifyContent: "space-between", py: 0, mb: 0, minHeight: isMobile ? 56 : 64 }}>
            {/* Marca del portal */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: "bold",
                  mr: 3,
                  userSelect: "none",
                }}
              >
                PORTAL
              </Typography>
            </Box>

            {/* Menú público (oculto en móvil) */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button color="inherit" component={RouterLink} to="/">
                  Inicio
                </Button>
                <Button color="inherit" component={RouterLink} to="/about">
                  Nosotros
                </Button>
                <Button color="inherit" component={RouterLink} to="/contact">
                  Contacto
                </Button>
              </Box>
            )}

            {/* Área derecha: auth */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isAuthenticated ? (
                <IconButton
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  aria-label="Iniciar sesión"
                  sx={{ ml: 1 }}
                >
                  <AccountCircleIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    size="small"
                    sx={{ ml: 1 }}
                    color="inherit"
                    aria-label="Menú de usuario"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.name?.slice(0, 1)?.toUpperCase() ?? "U"}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {user?.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ opacity: 0.75, display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        {user?.email}
                      </Typography>

                      {/* Badge de rol */}
                      {roles.length > 0 && (
                        <Box
                          sx={{
                            mt: 0.75,
                            display: "inline-block",
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "#fff",
                            backgroundColor: roleBg,
                          }}
                        >
                          {primaryRole?.toUpperCase()}
                        </Box>
                      )}
                    </Box>
                    <Divider />

                    {/* Accesos según rol */}
                    {canAdmin && (
                      <MenuItem
                        component={RouterLink}
                        to="/admin"
                        onClick={() => setAnchorEl(null)}
                      >
                        Panel de administración
                      </MenuItem>
                    )}
                    {isAbogado && (
                      <MenuItem
                        component={RouterLink}
                        to="/dashboard"
                        onClick={() => setAnchorEl(null)}
                      >
                        Mi panel
                      </MenuItem>
                    )}

                    <Divider />
                    <MenuItem
                      onClick={async () => {
                        setAnchorEl(null);
                        await logout();
                      }}
                    >
                      Cerrar sesión
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Contenido principal: ahora usa Outlet */}
      <Container component="main" maxWidth="lg" sx={{ pt: 0, pb: 0, flex: 1 }}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.grey[900],
          color: "#fff",
          py: 6,
          width: "100vw",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            px: { xs: 2, sm: 4, md: 6 },
            maxWidth: 1440,
            mx: "auto",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 4,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Columna 1 */}
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Colegio de Abogados de Selva Central
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                Institución dedicada a la formación, defensa y representación de
                los profesionales del derecho en la Selva Central y todo el Perú, con más de
                70 años de trayectoria.
              </Typography>

              {/* Contacto */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">
                    Jr. Arequipa 1234, Chachamayo, Junín
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">+51 01 234 5678</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2">
                    info@colegiodeabogadosselvacentral.pe
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Columna 2 (oculta en xs/sm) */}
            <Box
              sx={{
                flex: 1,
                minWidth: 250,
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Horario de Atención
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Lunes a Viernes: 9:00 AM - 6:00 PM
                <br />
                Sábados: 9:00 AM - 1:00 PM
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Síguenos
              </Typography>
              <Box>
                <IconButton
                  href="https://facebook.com/colegiodeabogadoslima"
                  color="inherit"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://twitter.com/colegiodeabogadoslima"
                  color="inherit"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com/colegiodeabogadoslima"
                  color="inherit"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener"
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Columna 3 (oculta en xs/sm) */}
            <Box
              sx={{
                flex: 1,
                minWidth: 250,
                display: { xs: "none", md: "block" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Visita también
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                  Nuestra Historia
                </Link>
                <Link component={RouterLink} to="/services" color="inherit" underline="hover">
                  Servicios
                </Link>
                <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                  Contáctanos
                </Link>
                <Link component={RouterLink} to="/noticias" color="inherit" underline="hover">
                  Noticias
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Copyright */}
          <Box mt={4} textAlign="center" fontSize="0.875rem" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Colegio de Abogados de Selva Central. Todos los
            derechos reservados.
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
