import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { obtenerUsuarios } from "../../services/usuarioService";
import ConfirmDialog from "../../components/confirmDialog";
import FormularioUsuario from "./componentes/FormularioUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarFormulario(true);
  };

const handleGuardarUsuario = (usuarioActualizado) => {
  if (usuarioSeleccionado) {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
    );
  } else {
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    setUsuarios((prev) => [...prev, { ...usuarioActualizado, id: nuevoId }]);
  }

  setMostrarFormulario(false);
  setUsuarioSeleccionado(null);
};

  const handleEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setOpenDialog(true);
  };

  const confirmarEliminacion = () => {
    console.log("Eliminando usuario:", usuarioAEliminar);
    setUsuarios((prev) => prev.filter((u) => u.id !== usuarioAEliminar.id));
    setOpenDialog(false);
    setUsuarioAEliminar(null);
  };

  const handleNuevoUsuario = () => {
    setUsuarioSeleccionado(null);
    setMostrarFormulario(true);
  };


  const cancelarEliminacion = () => {
    setOpenDialog(false);
    setUsuarioAEliminar(null);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Paper elevation={4} sx={{ borderRadius: 3 }}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              padding: 2,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <Typography variant="h5" component="h2">
              Usuarios
            </Typography>
          </Box>

          <Box sx={{ padding: 3 }}>
            <TableContainer component={Paper} elevation={1}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: "grey.100" }}>
                  <TableRow>
                    <TableCell>
                      <strong>ID</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Nombre</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Teléfono</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Acciones</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow
                      key={usuario.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "grey.50" },
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <TableCell>{usuario.id}</TableCell>
                      <TableCell>{`${usuario.name.firstname} ${usuario.name.lastname}`}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.phone}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditarUsuario(usuario)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleEliminar(usuario)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNuevoUsuario}
              >
                Nuevo Usuario
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <ConfirmDialog
        open={openDialog}
        title="Confirmar eliminación"
        message={`¿Estás seguro que deseas eliminar a ${usuarioAEliminar?.name?.firstname} ${usuarioAEliminar?.name?.lastname}?`}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
      />
      {mostrarFormulario && (
        <FormularioUsuario
          open={mostrarFormulario}
          usuario={usuarioSeleccionado}
          onClose={() => {
            setMostrarFormulario(false);
            setUsuarioSeleccionado(null);
          }}
          onGuardar={handleGuardarUsuario}
        />
      )}
    </Grid>
  );
};

export default Usuarios;
