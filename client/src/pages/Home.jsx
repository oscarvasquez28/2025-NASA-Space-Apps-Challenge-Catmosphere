import Test from '../components/Test'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LocationHeader from '../components/LocationHeader';
import GeneralIndicators from '../components/GeneralIndicators';
import DailyRecommendation from '../components/DailyRecommendation';
import DailyIndicators from '../components/DailyIndicators';
import InteractiveMap from '../components/InteractiveMap';
import HistoricalChart from '../components/HistoricalChart';
import { useState } from 'react';

const Home = () => {
  const [location, setLocation] = useState(null);
  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: '2rem' }}>
        <LocationHeader />
        <GeneralIndicators location={location} />
        <DailyRecommendation />
        <Stack spacing={2} direction="row">
          <DailyIndicators />
          <InteractiveMap onLocationSelect={setLocation} />
        </Stack>
        <HistoricalChart />
      </Box>
    </Container>
  )
}

export default Home