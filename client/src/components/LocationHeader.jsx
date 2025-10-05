import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import api from '../lib/axios';
import Weather from '../services/Weather';

function LocationHeader() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [weather, setWeather] = useState(null);

  async function getWeather() {
    try {
      const data = await Weather.getWeather(location);
      setWeather(data);
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(coords);
          sessionStorage.setItem('userLocation', JSON.stringify(coords));
        },
        (err) => {
          // Si falla, usar Guadalupe por defecto
          const locationDefault = { lat: 25.6767, lng: -100.2565 };
          setLocation(locationDefault);
          setError(`No se pudo obtener la ubicación: ${err.message}`);
        }
      );
    } else {
      // Si no soporta geolocalización, usar Guadalupe por defecto
      const guadalupe = { lat: 25.6767, lng: -100.2565 };
      setLocation(guadalupe);
      setError('Geolocalización no soportada');
    }
  }, []);

  useEffect(() => {
    if (location) {
      // Geocodificación inversa
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
          // Guardar ciudad en sessionStorage
          const city = data.address?.city || data.address?.town || data.address?.village || '';
          const state = data.address?.state || data.address?.county || '';
          if (city || state) {
            sessionStorage.setItem('userCity', `${city}, ${state}`);
          }
        })
        .catch(() => {
          setAddress(null);
        });

      getWeather();
    }
  }, [location]);

  if (!address && !error) {
    return (
      <Container>
        <Box alignItems="center" textAlign="center">
          <Skeleton variant="text" width={250} height={40} sx={{ margin: '16px auto' }} />
          <Skeleton variant="text" width={100} height={32} sx={{ margin: '8px auto' }} />
          <Skeleton variant="text" width={180} height={28} sx={{ margin: '8px auto' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box alignItems="center" textAlign="center">
        <Typography variant="h4" component="h2">
          {address && (address.city || address.town || address.village)
            ? `${address.city || address.town || address.village}, ${address.state || address.county || ''}`
            : 'Guadalupe, Nuevo León'}
        </Typography>
        <Typography variant="h4" component="h2">
          {weather && weather.data && weather.data.temperature !== undefined
            ? `${weather.data.temperature}°C`
            : <Skeleton variant="text" width={60} sx={{ margin: '8px auto' }} />}
        </Typography>
        <Typography variant="h5" component="h3">
          {weather && weather.data && weather.data.summary
            ? weather.data.summary
            : <Skeleton variant="text" width={180} sx={{ margin: '8px auto' }} />}
        </Typography>
        {location && (
          <Typography variant="body1">
            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default LocationHeader