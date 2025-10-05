import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Gemini from '../services/Gemini';

function DailyRecommendation() {
  const [dailyRecommendation, setDailyRecommendation] = useState("Cargando recomendación...");
  useEffect(() => {
    const fetchDailyRecommendation = async () => {

      const coords = sessionStorage.getItem('userLocation');
      const user = sessionStorage.getItem('user');
      const recommendation = await Gemini.getGeminiRecommendation({ location: coords, userPreferences: user ?? null});
      setDailyRecommendation(recommendation);
    };
    fetchDailyRecommendation();

  },[]);

  return (
    <Container>
      <Card sx={{ 
        minWidth: 300,
        minHeight: 50,
        textAlign: 'center',
        alignContent: 'center',
        py: 2
      }}>
        <Typography variant={{ xs: 'h6', sm: 'h1' }}>{dailyRecommendation}</Typography>
      </Card>
    </Container>
  )
}

export default DailyRecommendation