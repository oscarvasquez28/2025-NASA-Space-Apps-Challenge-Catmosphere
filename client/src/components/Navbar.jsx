
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  // Puedes cambiar esto por tu lógica real de autenticación
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  const handleLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff', color: '#222' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#222' }}>
          Catmosphere
        </Typography>
        {isLoggedIn ? (
          <Button sx={{ color: '#222' }} onClick={handleLogout}>Cerrar sesión</Button>
        ) : (
          <Button sx={{ color: '#222' }} onClick={handleLogin}>Iniciar sesión</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar