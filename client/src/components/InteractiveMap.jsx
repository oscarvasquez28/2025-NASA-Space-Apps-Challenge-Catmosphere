import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMapEvent } from 'react-leaflet';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Skeleton from '@mui/material/Skeleton';
import api from '../lib/axios';
import Weather from '../services/Weather';
import { Typography } from '@mui/material';

function InteractiveMap() {
  // No hay posición por defecto, solo si no se obtiene nada se usa fallback
  const [position, setPosition] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Componente auxiliar para centrar el mapa dinámicamente
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

// Devuelve el label, color y descripción según el índice de calidad del aire
function getAirQualityInfo(aqi) {
  if (aqi === 1) {
    return { label: 'Buena', color: 'success.main', desc: 'El aire es saludable para todos.' };
  } else if (aqi === 2) {
    return { label: 'Regular', color: 'info.main', desc: 'La calidad del aire es regular, puede haber molestias leves para personas sensibles.' };
  } else if (aqi === 3) {
    return { label: 'Moderada', color: 'warning.main', desc: 'Personas sensibles pueden experimentar molestias leves.' };
  } else if (aqi === 4) {
    return { label: 'Pobre', color: 'error.main', desc: 'Puede afectar la salud de grupos sensibles y algunas personas sanas.' };
  } else if (aqi === 5) {
    return { label: 'Muy Pobre', color: 'error.dark', desc: 'Riesgo alto para la salud de toda la población.' };
  } else {
    return { label: 'Desconocida', color: 'text.primary', desc: 'No hay datos disponibles.' };
  }
}

// Componente para manejar el click en el mapa y mostrar modal
function MapClickHandler({ onSelect }) {
  useMapEvent('click', (e) => {
    onSelect([e.latlng.lat, e.latlng.lng]);

  });
  return null;
}

  useEffect(() => {
    const stored = sessionStorage.getItem('userLocation');
    if (stored) {
      try {
        const coords = JSON.parse(stored);
        if (coords.lat && coords.lng) {
          setPosition([coords.lat, coords.lng]);
          setLoading(false);
          return;
        }
      } catch (e) {
        // Si hay error, sigue buscando
      }
    }
    // Si no hay en localStorage, pedir al navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (err) => {
          setError('No se pudo obtener la ubicación.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocalización no soportada.');
      setLoading(false);
    }
  }, []);

  // Obtener ciudad y clima cuando cambian las coordenadas seleccionadas y el modal está abierto
  useEffect(() => {
    if (selectedCoords && modalOpen) {
      const [lat, lng] = selectedCoords;
      // Obtener ciudad
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=es`;
      fetch(url, {
        headers: {
          'User-Agent': 'CatmosphereApp/1.0',
          'Referer': window.location.origin
        }
      })
        .then(res => res.json())
        .then(data => {
          const city = data.address?.city || data.address?.town || data.address?.village || '';
          const state = data.address?.state || data.address?.county || '';
          setSelectedCity(city || state ? `${city}, ${state}` : 'Desconocida');
        })
        .catch(() => setSelectedCity('Desconocida'));

      // Obtener clima
      setWeatherLoading(true);
      setWeatherError(null);
      setWeather(null);

      Weather.getWeather({ lat, lng })
        .then(res => {
          setWeather(res);
          setWeatherLoading(false);
        })
        .catch(() => {
          setWeather(null);
          setWeatherError('No disponible');
          setWeatherLoading(false);
        });
    } else {
      setSelectedCity('');
      setWeather(null);
      setWeatherError(null);
    }
  }, [selectedCoords, modalOpen]);

  if (loading) {
    return (
      <Container>
        <Skeleton variant="rectangular" width="100%" height={400} animation="wave" sx={{ borderRadius: 2, margin: 2 }} />
      </Container>
    );
  }
  if (error || !position) {
    // Fallback: Guadalupe, Nuevo León
    const fallback = [25.6767, -100.2565];
    return (
      <Container sx={{ my: 2 }}>
        <Box sx={{ height: '400px', width: '100%', my: 2 }}>
          <MapContainer center={fallback} zoom={13} style={{ height: '100%', width: '100%' }}>
            <RecenterMap position={fallback} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={fallback}>
              <Popup>
                {`Lat: ${fallback[0].toFixed(4)}, Lng: ${fallback[1].toFixed(4)}`}
              </Popup>
            </Marker>
            <MapClickHandler onSelect={(coords) => { setSelectedCoords(coords); setModalOpen(true); }} />
          </MapContainer>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 2 }}>
      <Box sx={{ height: '400px', width: '100%', my: 2 }}>
        <MapContainer key={position.join(',')} center={position} zoom={13} style={{ height: '100%', width: '100%'}}>
          <RecenterMap position={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {`Lat: ${position[0].toFixed(4)}, Lng: ${position[1].toFixed(4)}`}
            </Popup>
          </Marker>
          <MapClickHandler onSelect={(coords) => { setSelectedCoords(coords); setModalOpen(true); }} />
        </MapContainer>
      </Box>
      {/* Modal para mostrar coordenadas seleccionadas */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '2px solid #1976d2',
            minWidth: { xs: 260, sm: 350 },
            maxWidth: 420,
            width: '92vw',
            p: 0,
            position: 'relative',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main', pb: 1 }}>
          Coordenadas seleccionadas
          <IconButton
            aria-label="Cerrar"
            onClick={() => setModalOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#1976d2' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0, pb: 2, px: 3 }}>
          {selectedCoords && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 1 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Latitud</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedCoords[0].toFixed(6)}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Longitud</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedCoords[1].toFixed(6)}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Ciudad</Typography>
                <Typography variant="body1">{selectedCity || 'Buscando...'}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Clima</Typography>
                {weatherLoading && <Typography variant="body1">Cargando clima...</Typography>}
                {weatherError && <Typography variant="body1">Clima: {weatherError}</Typography>}
                {weather && !weatherError && !weatherLoading && (
                  <>
                    <Typography variant="body1">{weather.data?.summary || weather.data?.description || 'No disponible'}</Typography>
                    <Typography variant="body2">Temperatura: {weather.data?.temperature !== undefined ? `${weather.data.temperature}°C` : 'No disponible'}</Typography>
                  </>
                )}
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Calidad del aire</Typography>
                {(() => {
                  const aqi = weather?.data?.air_quality_index;
                  const { label, color, desc } = getAirQualityInfo(aqi);
                  return <>
                    <Typography variant="body1" fontWeight="bold" color={color}>{label}</Typography>
                    <Typography variant="body2">{desc}</Typography>
                  </>;
                })()}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setModalOpen(false)} variant="contained" color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default InteractiveMap