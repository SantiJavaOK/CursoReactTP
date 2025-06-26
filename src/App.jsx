// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productos from './pages/Productos/Productos';
import Usuarios from './pages/Usuarios/Usuarios';
import Layout from '../src/components/Layout/Layout';
import Inicio from './pages/Inicio/Inicio';
import Login from '../src/components/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta sin layout (sin header) */}
        <Route path="/login" element={<Login />} />

        {/* Rutas con header (envueltas en Layout) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
