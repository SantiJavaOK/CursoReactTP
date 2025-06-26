// src/pages/Productos/Productos.js
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  obtenerProductos,
  eliminarProducto,
} from "../../services/productoService";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormularioProducto from "./componentes/FormularioProducto";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarFormulario(true);
  };

  useEffect(() => {
    obtenerProductos()
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Productos
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "primary.light" }}>
                  <TableRow>
                    <TableCell>
                      <strong>ID</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Título</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Descripción</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Precio</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Categoría</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Acciones</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>{producto.id}</TableCell>
                      <TableCell>{producto.title}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {producto.description}
                      </TableCell>
                      <TableCell>${producto.price}</TableCell>
                      <TableCell>{producto.category}</TableCell>
                      <TableCell>
                        <EditIcon
                          aria-label="ver"
                          color="primary"
                          onClick={() => handleEditarProducto(producto)}
                        >
                          <PageviewIcon />
                        </EditIcon>
                        <DeleteIcon
                          aria-label="eliminar"
                          onClick={() => {
                            setProductoAEliminar(producto);
                            setConfirmarEliminar(true);
                          }}
                          sx={{
                            marginLeft: 1,
                            color: "error.main",
                            cursor: "pointer",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
              >
                {mostrarFormulario ? "Cerrar" : "Agregar"}
              </Button>
            </Box>
          </Box>

          {mostrarFormulario && (
            <Box sx={{ padding: 3, backgroundColor: "background.default" }}>
              <FormularioProducto
                open={mostrarFormulario}
                producto={productoSeleccionado}
                onClose={() => {
                  setMostrarFormulario(false);
                  setProductoSeleccionado(null);
                }}
                onGuardar={(nuevoProducto) => {
                  if (productoSeleccionado) {
                    // Editar
                    setProductos((prev) =>
                      prev.map((p) =>
                        p.id === productoSeleccionado.id
                          ? { ...p, ...nuevoProducto }
                          : p
                      )
                    );
                  } else {
                    // Alta
                    setProductos([
                      ...productos,
                      { id: productos.length + 1, ...nuevoProducto },
                    ]);
                  }
                  setMostrarFormulario(false);
                  setProductoSeleccionado(null);
                }}
              />
            </Box>
          )}
          <Dialog
            open={confirmarEliminar}
            onClose={() => setConfirmarEliminar(false)}
          >
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              ¿Estás seguro que querés eliminar el producto{" "}
              <strong>{productoAEliminar?.title}</strong>?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmarEliminar(false)}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  try {
                    await eliminarProducto(productoAEliminar.id);
                    setProductos(
                      productos.filter((p) => p.id !== productoAEliminar.id)
                    );
                    setConfirmarEliminar(false);
                    setProductoAEliminar(null);
                  } catch (error) {
                    alert("Error eliminando el producto");
                  }
                }}
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Productos;
