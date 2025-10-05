import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const GeneralIndicatorsArray = [
  {
    name: 'co',
    label: 'Monóxido de carbono',
    unit: 'mg/m³',
  },
  {
    name: 'no',
    label: 'Óxido nítrico',
    unit: 'µg/m³',
  },
  {
    name: 'no2',
    label: 'Dióxido de nitrógeno',
    unit: 'µg/m³',
  },
  {
    name: 'so2',
    label: 'Dióxido de azufre',
    unit: 'µg/m³',
  },
  {
    name: 'pm10',
    label: 'Partículas PM10',
    unit: 'µg/m³',
  },
  {
    name: 'nh3',
    label: 'Amoniaco',
    unit: 'µg/m³',
  },
];

function GeneralIndicators() {
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
              <Box sx={{minHeight: 60, mb: 1}}>
                <Typography variant={{ xs: 'body1', sm: 'h5' }} fontWeight="bold">{indicator.label}</Typography>
                <Typography variant="body2" color="text.secondary">({indicator.name.toUpperCase()})</Typography>
              </Box>
              <Typography variant="h4">15.2</Typography>
              <Typography variant="caption" color="text.secondary">{indicator.unit}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default GeneralIndicators