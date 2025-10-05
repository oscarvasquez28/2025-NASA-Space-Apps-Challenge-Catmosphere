import {Card, CardContent, CardHeader, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { LineChart } from '@mui/x-charts';
import Weather from '../services/Weather';
import { useEffect, useState } from 'react';

function HistoricalChart() {

  const [forecast, setForecast] = useState(null);
  const dayTranslations = {
    'Mon': 'Lunes',
    'Tue': 'Martes',
    'Wed': 'Miércoles',
    'Thu': 'Jueves',
    'Fri': 'Viernes',
    'Sat': 'Sábado',
    'Sun': 'Domingo'
  };

  const getDayAbbreviation = (date) => date.toString().split(' ')[0];

  const todayAbbr = getDayAbbreviation(new Date());
  const nextDaysAbbr = [];
  for (let i = 1; i <= 4; i++) {
    const nextDay = new Date();
    nextDay.setDate(new Date().getDate() + i);
    nextDaysAbbr.push(getDayAbbreviation(nextDay));
  }

  const englishDays = [todayAbbr, ...nextDaysAbbr];
  const Days = englishDays.map(day => dayTranslations[day]);


    useEffect(() => {
      async function GetForecast()
      {
        try {
          const storedLocation = sessionStorage.getItem('userLocation');
          let coords;
          if (storedLocation) {
            coords = JSON.parse(storedLocation);
          } else {
            // Coordenadas de Guadalupe, NL, MX
            coords = { lat: 25.676, lng: -100.256 };
            console.log('No user location found in sessionStorage. Using Guadalupe default location.');
          }
          const forecastData = await Weather.getForecast(coords);
          setForecast(forecastData.prediction);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
  
      }
      GetForecast();
    },[])


    useEffect(() => 
    {
console.log('Forecast updated:', forecast);
    },[forecast])
  return (
    <Container>
      <Card>
        <Typography variant="h6" align="center" sx={{ mt: 2, fontWeight: 'bold' }}>
          Pronóstico de Calidad del Aire (CO) - Próximos 5 Días
        </Typography>
        <CardContent sx={{ minWidth: 300, minHeight: 200, textAlign: 'center', placeContent: 'center' }}>
          <LineChart
            series={[{ data: forecast ? forecast.map(item => Number(item)) : [0, 0, 0, 0, 0], label: 'PPM' }]}
            xAxis={[{ scaleType: 'point', data: Days }]}
          />
        </CardContent>
      </Card>
    </Container>
  )
}

export default HistoricalChart