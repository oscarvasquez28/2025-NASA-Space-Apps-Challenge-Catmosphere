import { Stack, Modal, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Weather from '../services/Weather';


function GeneralIndicators({location}) {

  const GeneralIndicators = [
    {
      name: 'co',
      label: 'Monóxido de carbono',
      unit: 'µg/m³',
      description: 'El monóxido de carbono es un gas que no se puede ver ni oler. Sale principalmente de autos y estufas. Respirarlo puede causar dolor de cabeza, mareo y, en grandes cantidades, es muy peligroso para la salud.'
    },
    {
      name: 'no',
      label: 'Óxido nítrico',
      unit: 'µg/m³',
      description: 'El óxido nítrico se produce sobre todo por el humo de los autos y fábricas. Puede afectar la calidad del aire y, si hay mucho, puede causar molestias al respirar.'
    },
    {
      name: 'no2',
      label: 'Dióxido de nitrógeno',
      unit: 'µg/m³',
      description: 'El dióxido de nitrógeno viene del tráfico y de quemar combustibles. Respirarlo puede irritar los ojos y la garganta, y empeorar problemas como el asma.'
    },
    {
      name: 'so2',
      label: 'Dióxido de azufre',
      unit: 'µg/m³',
      description: 'El dióxido de azufre se genera al quemar carbón o petróleo. Puede causar tos, irritación en la nariz y problemas para respirar, sobre todo en personas sensibles.'
    },
    {
      name: 'pm10',
      label: 'Partículas PM10',
      unit: 'µg/m³',
      description: 'Las partículas PM10 son polvo y suciedad muy pequeños que flotan en el aire. Al respirarlas pueden entrar a los pulmones y causar tos o molestias, especialmente en niños y personas mayores.'
    },
    {
      name: 'nh3',
      label: 'Amoniaco',
      unit: 'µg/m³',
      description: 'El amoníaco se encuentra en productos de limpieza y en el aire cerca de granjas. Puede irritar los ojos, la piel y la garganta si se respira mucho.'
    },
  ];
  const [GeneralIndicatorsArray, setGeneralIndicatorsArray] = useState(GeneralIndicators);
  const [openModal, setOpenModal] = useState(null); // nombre del indicador abierto

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
    if (location) {
      getIndicators(location);
    } else if (navigator.geolocation) {
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
              position: 'relative',
            }}
            key={indicator.name}
          >
            <CardContent sx={{padding: 1}}>
              <Box sx={{ minHeight: 60, mb: 1 }}>
                <Typography variant={{ xs: 'body1', sm: 'h5' }} fontWeight="bold">{indicator.label}</Typography>
                <Typography variant="body2" color="text.secondary">({indicator.name.toUpperCase()})</Typography>
              </Box>
              <Typography variant="h4">{indicator.value}</Typography>
              <Typography variant="caption" color="text.secondary">{indicator.unit}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  size="small"
                  onClick={e => { e.stopPropagation(); setOpenModal(indicator.name); }}
                  aria-label={`Más información sobre ${indicator.label}`}
                >
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
            <Modal
              open={openModal === indicator.name}
              onClose={() => setOpenModal(null)}
              aria-labelledby={`modal-title-${indicator.name}`}
              aria-describedby={`modal-desc-${indicator.name}`}
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxWidth: 400,
                width: '90%',
              }}>
                <Typography id={`modal-title-${indicator.name}`} variant="h6" fontWeight="bold" gutterBottom>
                  {indicator.label} ({indicator.name.toUpperCase()})
                </Typography>
                <Typography id={`modal-desc-${indicator.name}`} variant="body1">
                  {indicator.description}
                </Typography>
              </Box>
            </Modal>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default GeneralIndicators