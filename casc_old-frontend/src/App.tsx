// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import BlankLayout from "@/layouts/BlankLayout";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AbogadoLayout from "@/layouts/AbogadoLayout";

import ProtectedRoute from "@/routes/ProtectedRoute";

// Páginas públicas
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Login from "@/pages/auth/LoginMinimal";

// Páginas admin
import AdminDashboard from "@/pages/admin/Dashboard";
import AbogadosPage from "@/pages/admin/abogados/AbogadosPage"; // ✅ Import correcto

// Páginas abogado
import AbogadoDashboard from "@/pages/abogado/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 1) LOGIN en layout en blanco */}
          <Route element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* 2) RUTAS PÚBLICAS con PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* 3) RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            {/* 3a) ADMIN */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/abogados" element={<AbogadosPage />} /> {/* ✅ Aquí tu página */}
              <Route path="/admin/pagos" element={<div>Pagos</div>} />
              <Route path="/admin/config" element={<div>Configuración</div>} />
            </Route>

            {/* 3b) ABOGADO */}
            <Route element={<AbogadoLayout />}>
              <Route path="/dashboard" element={<AbogadoDashboard />} />
              <Route path="/dashboard/pagos" element={<div>Mis Pagos</div>} />
              <Route path="/dashboard/votaciones" element={<div>Votaciones</div>} />
              <Route path="/dashboard/perfil" element={<div>Mi Perfil</div>} />
            </Route>
          </Route>

          {/* 4) Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
