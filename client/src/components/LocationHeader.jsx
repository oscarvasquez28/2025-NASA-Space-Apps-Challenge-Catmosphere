

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

function LocationHeader() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError(`No se pudo obtener la ubicación: ${err.message}`);
        }
      );
    } else {
      setError('Geolocalización no soportada');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&accept-language=es`;
      fetch(url, {
        headers: {
          'User-Agent': 'CatmosphereApp/1.0',
          'Referer': window.location.origin
        }
      })
        .then(res => res.json())
        .then(data => {
          setAddress(data.address);
        })
        .catch(() => {
          setAddress(null);
        });
    }
  }, [location]);

  return (
    <Container>
      <Box alignItems="center" textAlign="center">
        <Typography variant="h4" component="h2">
          {address && (address.city || address.town || address.village)
            ? `${address.city || address.town || address.village}, ${address.state || address.county || ''}`
            : 'San Pedro Garza García'}
        </Typography>
        <Typography variant="h4" component="h2">26°C</Typography>
        <Typography variant="h5" component="h3">Parcialmente Nublado</Typography>
        {location && (
          <Typography variant="body1">
            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
          </Typography>
        )}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default LocationHeader