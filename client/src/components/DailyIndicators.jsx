import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Stack, Typography } from '@mui/material';


function DailyIndicators() {
  const Today = new Date().toString().split(' ')[0];

  const next4Days = [];
  for (let i = 1; i <= 4; i++) {
    const nextDay = new Date();
    nextDay.setDate(new Date().getDate() + i);
    next4Days.push(nextDay.toString().split(' ')[0]);
  }
  
  const Days = [Today, ...next4Days];
  
  return (
    <Container>
      {Days.map((day) => (
        <Card key={day} 
        sx={{ minWidth: { xs: 35, sm: 75 },
        minHeight: { xs: 25, sm: 65 },
        textAlign: 'center',
        placeContent: 'center',
        my: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
            <Typography sx={{ fontSize: { xs: 10, sm: 16 } }}>{day}</Typography>
            <Typography sx={{ fontSize: { xs: 10, sm: 16 } }}>Air Condition</Typography>
          </Stack>
        </Card>
      ))}
    </Container>
  )
}

export default DailyIndicators