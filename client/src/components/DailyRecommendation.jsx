import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

function DailyRecommendation() {
  return (
    <Container>
      <Card sx={{ 
        minWidth: 300,
        minHeight: 50,
        textAlign: 'center',
        alignContent: 'center',
        py: 2
      }}>
        <Typography variant={{ xs: 'h6', sm: 'h1' }}>Daily Recommendation</Typography>
      </Card>
    </Container>
  )
}

export default DailyRecommendation