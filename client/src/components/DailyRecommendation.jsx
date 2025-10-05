import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Gemini from '../services/Gemini';
import {motion} from 'motion/react';

function DailyRecommendation() {
  const [dailyRecommendation, setDailyRecommendation] = useState(null);
  const LoadingMessage = "Cargando recomendación diaria...";
  useEffect(() => {
    const fetchDailyRecommendation = async () => {

      const user = JSON.parse(sessionStorage.getItem('user'));
      const recommendation = await Gemini.getGeminiRecommendation({ userPreferences: user ?? null });
      setDailyRecommendation(recommendation.data);
    };

    fetchDailyRecommendation();

  },[]);

  return (
    <Container>
      <Card sx={{ 
        minWidth: 300,
        minHeight: 60,
        textAlign: 'center',
        alignContent: 'center',
        py: 2
      }}>
        {dailyRecommendation ? (
          <Typography variant={{ xs: 'h6', sm: 'h1' }}>
            {dailyRecommendation}
          </Typography>
        ) : (
          <motion.div
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Duration of one cycle
              repeat: Infinity, // Infinite repetition
            }}
          >
            <Typography variant={{ xs: 'h6', sm: 'h1' }}>
              {LoadingMessage}
            </Typography>
          </motion.div>
        )}
      </Card>
    </Container>
  )
}

export default DailyRecommendation