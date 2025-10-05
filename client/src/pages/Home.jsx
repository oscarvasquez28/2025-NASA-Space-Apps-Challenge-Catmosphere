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
        <Stack spacing={2} direction="row" alignItems="stretch">
          <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            <DailyIndicators />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '67%' }, display: 'flex' }}>
            <Box sx={{ flex: 1 }}>
              <InteractiveMap onLocationSelect={setLocation} />
            </Box>
          </Box>
        </Stack>
        <HistoricalChart />
      </Box>
    </Container>
  )
}

export default Home