import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Weather from '../services/Weather';


function GeneralIndicators() {

  const GeneralIndicators = [
    {
      name: 'co',
      label: 'Monóxido de carbono',
      unit: 'ppm', // Partes por millón
    },
    {
      name: 'no',
      label: 'Óxido nítrico',
      unit: 'ppb', // Partes por billón
    },
    {
      name: 'no2',
      label: 'Dióxido de nitrógeno',
      unit: 'ppb', // Partes por billón
    },
    {
      name: 'so2',
      label: 'Dióxido de azufre',
      unit: 'ppb', // Partes por billón
    },
    {
      name: 'pm10',
      label: 'Partículas PM10',
      unit: 'µg/m³', // Microgramos por metro cúbico
    },
    {
      name: 'nh3',
      label: 'Amoniaco',
      unit: 'ppb', // Partes por billón
    },
  ];
  const [GeneralIndicatorsArray, setGeneralIndicatorsArray] = useState(GeneralIndicators);

  async function getIndicators(location) {
    try {
      const response = await Weather.getIndicators(location);
      const indicatorsData = response.data;
      const UpdatedIndicators = GeneralIndicators.map((indicator) => ({
        ...indicator,
        value: indicatorsData[indicator.name] !== undefined ? indicatorsData[indicator.name] : 'N/A',
      }));
      console.log(UpdatedIndicators);
      setGeneralIndicatorsArray(UpdatedIndicators);
    }
    catch (error) {
      console.error(error);
      setGeneralIndicatorsArray(GeneralIndicators);
    }
  }

  useEffect(() => {
if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        getIndicators(coords);
      });
    }
  }, [location]);
  return (
    <Container>
      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          justifyContent: { xs: 'flex-start', md: 'center' },
          py: 2,
        }}
      >
        {GeneralIndicatorsArray.map((indicator) => (
          <Card
            sx={{
              minHeight: { xs: 80, sm: 125 },
              textAlign: 'center',
              flex: { xs: '1 1 125px', sm: '1 1 145px', md: '1 1 160px' },
              mx: { xs: 0.5, sm: 1 },
              my: 1,
            }}
            key={indicator.name}
          >
            <CardContent>
              <Box sx={{ minHeight: 60, mb: 1 }}>
                <Typography variant={{ xs: 'body1', sm: 'h5' }} fontWeight="bold">{indicator.label}</Typography>
                <Typography variant="body2" color="text.secondary">({indicator.name.toUpperCase()})</Typography>
              </Box>
              <Typography variant="h4">{indicator.value}</Typography>
              <Typography variant="caption" color="text.secondary">{indicator.unit}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default GeneralIndicators