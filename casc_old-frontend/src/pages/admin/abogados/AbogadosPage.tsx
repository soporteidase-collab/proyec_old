// src/pages/admin/abogados/AbogadosPage.tsx
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Switch,
  Pagination,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import {
  AbogadoWithUser,
  CreatePayload,
  UpdatePayload,
  listAbogados,
  createAbogado,
  updateAbogado,
  removeAbogado,
} from '@/services/abogadosService';

const emptyCreate: CreatePayload = {
  user: {
    name: '',
    email: '',
    password: '',
    role: 'abogado',
  },
  numero_colegiatura: '',
  dni: '',
  nombres: '',
  apellidos: '',
  especialidad: '',
  email: '',
  habilitado_hasta: dayjs().add(6, 'month').toISOString(),
  activo: true,
};

export default function AbogadosPage() {
  const [rows, setRows] = useState<AbogadoWithUser[]>([]); // ← siempre array
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formCreate, setFormCreate] = useState<CreatePayload>({ ...emptyCreate });
  const [formUpdate, setFormUpdate] = useState<UpdatePayload>({});

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / perPage)), [total, perPage]);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await listAbogados({ q, page, per_page: perPage });

      // BLINDAJE: asegura array y total número
      const safeRows = Array.isArray((data as any)?.data)
        ? (data as any).data
        : Array.isArray(data)
        ? (data as any)
        : [];

      const safeTotal =
        typeof (data as any)?.total === 'number'
          ? (data as any).total
          : Array.isArray((data as any)?.data)
          ? (data as any).data.length
          : Array.isArray(data)
          ? (data as any).length
          : 0;

      setRows(safeRows);
      setTotal(safeTotal);
    } catch (err) {
      console.error('Error listAbogados:', err);
      setRows([]); // ← evita undefined
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openNew = () => {
    setIsEdit(false);
    setCurrentId(null);
    setFormCreate({ ...emptyCreate });
    setOpen(true);
  };

  const openEdit = (row: AbogadoWithUser) => {
    setIsEdit(true);
    setCurrentId(row.id!);
    setFormUpdate({
      user: {
        name: row.user?.name,
        email: row.user?.email,
        role: row.user?.role as any,
      },
      numero_colegiatura: row.numero_colegiatura,
      dni: row.dni,
      nombres: row.nombres,
      apellidos: row.apellidos,
      especialidad: row.especialidad ?? '',
      email: row.email,
      habilitado_hasta: dayjs(row.habilitado_hasta).toISOString(),
      activo: row.activo,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        if (!currentId) return;
        await updateAbogado(currentId, formUpdate);
      } else {
        if (!formCreate.user.name || !formCreate.user.email || !formCreate.user.password)
          return alert('Completa los datos de usuario (nombre, email, password).');
        if (
          !formCreate.nombres ||
          !formCreate.apellidos ||
          !formCreate.dni ||
          !formCreate.numero_colegiatura ||
          !formCreate.email
        )
          return alert('Completa los datos del abogado.');
        await createAbogado(formCreate);
      }
      setOpen(false);
      await fetchData();
    } catch (err) {
      console.error('Error guardando abogado:', err);
      alert('No se pudo guardar. Revisa la consola para más detalles.');
    }
  };

  const handleDelete = async (row: AbogadoWithUser) => {
    if (!row.id) return;
    if (!confirm(`¿Eliminar al abogado ${row.nombres} ${row.apellidos}?`)) return;
    try {
      await removeAbogado(row.id);
      await fetchData();
    } catch (err) {
      console.error('Error eliminando abogado:', err);
      alert('No se pudo eliminar. Revisa la consola.');
    }
  };

  // BLINDAJE en render: usa (rows ?? [])
  const safeRowsForRender = Array.isArray(rows) ? rows : [];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={700}>
          Gestión de Abogados
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="Buscar nombre, DNI, colegiatura…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => {
              setPage(1);
              fetchData();
            }}
          >
            Buscar
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={openNew}>
            Nuevo
          </Button>
        </Stack>
      </Stack>

      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Colegiatura</TableCell>
                  <TableCell>DNI</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email (abogado)</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Habilitado hasta</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safeRowsForRender.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.numero_colegiatura}</TableCell>
                    <TableCell>{r.dni}</TableCell>
                    <TableCell>
                      {r.nombres} {r.apellidos}
                    </TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.user?.name}</TableCell>
                    <TableCell>{r.user?.role?.toUpperCase()}</TableCell>
                    <TableCell>{dayjs(r.habilitado_hasta).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>
                      <Switch checked={r.activo} readOnly />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => openEdit(r)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleDelete(r)} size="small">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

                {safeRowsForRender.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 6, opacity: 0.7 }}>
                      Sin resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, p) => setPage(p)}
              color="primary"
              size="small"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Diálogo Crear/Editar */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isEdit ? 'Editar Abogado + Usuario' : 'Nuevo Abogado + Usuario'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2} mt={1}>
            <Typography variant="subtitle2">Datos de Usuario</Typography>

            {isEdit ? (
              <>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Nombre de usuario"
                    value={formUpdate.user?.name ?? ''}
                    onChange={(e) =>
                      setFormUpdate({ ...formUpdate, user: { ...formUpdate.user, name: e.target.value } })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Email de usuario"
                    value={formUpdate.user?.email ?? ''}
                    onChange={(e) =>
                      setFormUpdate({ ...formUpdate, user: { ...formUpdate.user, email: e.target.value } })
                    }
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Nueva contraseña (opcional)"
                    type="password"
                    value={formUpdate.user?.password ?? ''}
                    onChange={(e) =>
                      setFormUpdate({ ...formUpdate, user: { ...formUpdate.user, password: e.target.value } })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Rol"
                    select
                    value={formUpdate.user?.role ?? 'abogado'}
                    onChange={(e) =>
                      setFormUpdate({ ...formUpdate, user: { ...formUpdate.user, role: e.target.value as any } })
                    }
                    fullWidth
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="editor">Editor</MenuItem>
                    <MenuItem value="colaborador">Colaborador</MenuItem>
                    <MenuItem value="abogado">Abogado</MenuItem>
                  </TextField>
                </Stack>
              </>
            ) : (
              <>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Nombre de usuario"
                    value={formCreate.user.name}
                    onChange={(e) => setFormCreate({ ...formCreate, user: { ...formCreate.user, name: e.target.value } })}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Email de usuario"
                    type="email"
                    value={formCreate.user.email}
                    onChange={(e) => setFormCreate({ ...formCreate, user: { ...formCreate.user, email: e.target.value } })}
                    required
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    value={formCreate.user.password}
                    onChange={(e) =>
                      setFormCreate({ ...formCreate, user: { ...formCreate.user, password: e.target.value } })
                    }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Rol"
                    select
                    value={formCreate.user.role}
                    onChange={(e) =>
                      setFormCreate({ ...formCreate, user: { ...formCreate.user, role: e.target.value as any } })
                    }
                    fullWidth
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="editor">Editor</MenuItem>
                    <MenuItem value="colaborador">Colaborador</MenuItem>
                    <MenuItem value="abogado">Abogado</MenuItem>
                  </TextField>
                </Stack>
              </>
            )}

            <Divider />

            <Typography variant="subtitle2">Datos del Abogado</Typography>

            {isEdit ? (
              <>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Nombres"
                    value={formUpdate.nombres ?? ''}
                    onChange={(e) => setFormUpdate({ ...formUpdate, nombres: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Apellidos"
                    value={formUpdate.apellidos ?? ''}
                    onChange={(e) => setFormUpdate({ ...formUpdate, apellidos: e.target.value })}
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="DNI"
                    value={formUpdate.dni ?? ''}
                    onChange={(e) => setFormUpdate({ ...formUpdate, dni: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="N° Colegiatura"
                    value={formUpdate.numero_colegiatura ?? ''}
                    onChange={(e) =>
                      setFormUpdate({ ...formUpdate, numero_colegiatura: e.target.value })
                    }
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Especialidad"
                    value={formUpdate.especialidad ?? ''}
                    onChange={(e) => setFormUpdate({ ...formUpdate, especialidad: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Email (abogado)"
                    type="email"
                    value={formUpdate.email ?? ''}
                    onChange={(e) => setFormUpdate({ ...formUpdate, email: e.target.value })}
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Habilitado hasta"
                    type="date"
                    value={dayjs(formUpdate.habilitado_hasta ?? dayjs()).format('YYYY-MM-DD')}
                    onChange={(e) =>
                      setFormUpdate({
                        ...formUpdate,
                        habilitado_hasta: dayjs(e.target.value).toISOString(),
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 200 }}>
                    <Typography variant="body2">Inactivo</Typography>
                    <Switch
                      checked={!!formUpdate.activo}
                      onChange={(e) => setFormUpdate({ ...formUpdate, activo: e.target.checked })}
                    />
                    <Typography variant="body2">Activo</Typography>
                  </Stack>
                </Stack>
              </>
            ) : (
              <>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Nombres"
                    value={formCreate.nombres}
                    onChange={(e) => setFormCreate({ ...formCreate, nombres: e.target.value })}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Apellidos"
                    value={formCreate.apellidos}
                    onChange={(e) => setFormCreate({ ...formCreate, apellidos: e.target.value })}
                    required
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="DNI"
                    value={formCreate.dni}
                    onChange={(e) => setFormCreate({ ...formCreate, dni: e.target.value })}
                    required
                    fullWidth
                  />
                  <TextField
                    label="N° Colegiatura"
                    value={formCreate.numero_colegiatura}
                    onChange={(e) =>
                      setFormCreate({ ...formCreate, numero_colegiatura: e.target.value })
                    }
                    required
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Especialidad"
                    value={formCreate.especialidad ?? ''}
                    onChange={(e) => setFormCreate({ ...formCreate, especialidad: e.target.value })}
                    fullWidth
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Email (abogado)"
                    type="email"
                    value={formCreate.email}
                    onChange={(e) => setFormCreate({ ...formCreate, email: e.target.value })}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Habilitado hasta"
                    type="date"
                    value={dayjs(formCreate.habilitado_hasta).format('YYYY-MM-DD')}
                    onChange={(e) =>
                      setFormCreate({
                        ...formCreate,
                        habilitado_hasta: dayjs(e.target.value).toISOString(),
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">Inactivo</Typography>
                  <Switch
                    checked={formCreate.activo}
                    onChange={(e) => setFormCreate({ ...formCreate, activo: e.target.checked })}
                  />
                  <Typography variant="body2">Activo</Typography>
                </Stack>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
