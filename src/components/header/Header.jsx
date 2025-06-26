import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component="div">
              TP Final
            </Typography>
            <Button color="inherit" onClick={() => navigate('/inicio')}>
              Inicio
            </Button>
            <Button color="inherit" onClick={() => navigate('/productos')}>
              Productos
            </Button>
            <Button color="inherit" onClick={() => navigate('/usuarios')}>
              Usuarios
            </Button>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
