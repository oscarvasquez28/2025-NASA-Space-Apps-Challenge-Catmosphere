import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useMapEvent } from 'react-leaflet';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Skeleton from '@mui/material/Skeleton';
import api from '../lib/axios';
import Weather from '../services/Weather';

function InteractiveMap() {
  // No hay posición por defecto, solo si no se obtiene nada se usa fallback
  const [position, setPosition] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Componente auxiliar para centrar el mapa dinámicamente
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

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
          setWeather(res.data);
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
        <Skeleton variant="rectangular" width="100%" height={400} animation="wave" sx={{ borderRadius: 2, margin: 'auto' }} />
      </Container>
    );
  }
  if (error || !position) {
    // Fallback: Guadalupe, Nuevo León
    const fallback = [25.6767, -100.2565];
    return (
      <Container>
        <div style={{ height: '400px', width: '100%', margin: 'auto' }}>
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
        </div>
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
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Coordenadas seleccionadas</DialogTitle>
        <DialogContent>
          {selectedCoords && (
            <>
              <div>Latitud: {selectedCoords[0].toFixed(6)}</div>
              <div>Longitud: {selectedCoords[1].toFixed(6)}</div>
              <div>Ciudad: {selectedCity || 'Buscando...'}</div>
              <div>
                {weatherLoading && 'Cargando clima...'}
                {weatherError && `Clima: ${weatherError}`}
                {weather && !weatherError && !weatherLoading && (
                  <>
                    <div>Clima: {weather.data?.summary || weather.data?.description || 'No disponible'}</div>
                    <div>Temperatura: {weather.data?.temperature !== undefined ? `${weather.data.temperature}°C` : 'No disponible'}</div>
                  </>
                )}
              </div>
              <div>Calidad del aire: Mala</div>
              <div>Descripción: La calidad del aire es insalubre para grupos sensibles.</div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default InteractiveMap