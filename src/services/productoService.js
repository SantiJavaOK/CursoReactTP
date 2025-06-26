const BASE_URL = 'https://fakestoreapi.com/products';

export const obtenerProductos = async () => {
    console.log('Obteniendo productos desde:', BASE_URL);
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 0,
      title: producto.title,
      price: parseFloat(producto.price),
      description: producto.description,
      category: producto.category,
      image: '',
    }),
  });

  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }

  const data = await response.json();
  return data;
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    const data = await response.json();
    console.log('Producto eliminado:', data);
    return data;
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    throw error;
  }
};


