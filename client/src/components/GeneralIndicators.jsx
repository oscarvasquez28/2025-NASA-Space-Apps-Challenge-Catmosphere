import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const GeneralIndicatorsArray = [{
  name: 'Temperature',
}, {
  name: 'Humidity',
}, {
  name: 'Wind Speed',
}, {
  name: 'Air Quality Index',
}, {
  name: 'UV Index',
},
{
  name: 'Pressure',
}];

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
              <Typography variant={{ xs: 'body1', sm: 'h5' }}>{indicator.name}</Typography>
              <Typography variant="h4">--</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default GeneralIndicators