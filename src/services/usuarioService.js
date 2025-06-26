const BASE_URL = 'https://fakestoreapi.com/users';

export const obtenerUsuarios = async () => {
  console.log('Obteniendo usuarios desde:', BASE_URL);
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerUsuarios:', error);
    throw error;
  }
};

