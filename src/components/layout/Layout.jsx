import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const Layout = () => {
  return (
    <>
      <Header />
      {/* Para que el contenido no quede debajo del AppBar */}
      <Toolbar />
      <Container sx={{ marginTop: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
