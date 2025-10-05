import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Stack, Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import Weather from '../services/Weather';
import { motion } from 'motion/react';


function DailyIndicators() {
  const [predictions, setPredictions] = useState([1,1,5,3,6]);
  const dayMap = {
    'Sun': 'Domingo',
    'Mon': 'Lunes',
    'Tue': 'Martes',
    'Wed': 'Miércoles',
    'Thu': 'Jueves',
    'Fri': 'Viernes',
    'Sat': 'Sábado'
  };

    const getAirQualityStatus = (value) => {
    const numValue = Number(value);
    if (numValue <= 2) {
      return { text: 'Bueno', color: 'green' };
    }
    if (numValue <= 5) {
      return { text: 'Moderado', color: 'orange' };
    }
    return { text: 'Malo', color: 'red' };
  };

  
  useEffect(() => {
    async function GetForecast()
    {
      try {
        const storedLocation = sessionStorage.getItem('userLocation');
        if (storedLocation) {
          const coords = JSON.parse(storedLocation);
          const forecastData = await Weather.getForecast(coords);
          setPredictions(forecastData.prediction);
        } else {
          console.log('No user location found in sessionStorage.');
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }

    }
    GetForecast();
  },[])

  const getSpanishDay = (date) => {
    const dayAbbr = date.toString().split(' ')[0];
    return dayMap[dayAbbr];
  };

  const today = new Date();
  const Days = [getSpanishDay(today)];

  for (let i = 1; i <= 4; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    Days.push(getSpanishDay(nextDay));
  }
  return (
    <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        {Days.map((day, index) => {
          const predictionValue = predictions[index];
          const airQuality = predictionValue !== undefined ? getAirQualityStatus(predictionValue) : { text: 'Cargando...', color: 'text.secondary' };

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  minWidth: { xs: 35, sm: 75 },
                  minHeight: { xs: 25, sm: 65 },
                  textAlign: 'center',
                  placeContent: 'center',
                  my: 2,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
                  <Typography sx={{ fontSize: { xs: 10, sm: 16 } }}>{day}</Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 10, sm: 16 },
                      color: airQuality.color,
                      fontWeight: 'bold',
                    }}
                  >
                    {airQuality.text}
                  </Typography>
                </Stack>
              </Card>
            </motion.div>
          );
        })}
    </motion.div>
      </Container>
  );
}

export default DailyIndicators