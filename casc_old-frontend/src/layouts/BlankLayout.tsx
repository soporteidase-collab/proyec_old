// src/layouts/BlankLayout.tsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function BlankLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Outlet /> {/* <- aquí se renderiza /login */}
    </Box>
  );
}
