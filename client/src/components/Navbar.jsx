
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';


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
        {location.pathname === '/login' ? (
          <Button sx={{ color: '#222' }} onClick={() => navigate(-1)}>Regresar</Button>
        ) : isLoggedIn ? (
          <Button sx={{ color: '#222' }} onClick={handleLogout}>Cerrar sesión</Button>
        ) : (
          <Button sx={{ color: '#222' }} onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar