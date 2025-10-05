import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Stack, Typography } from '@mui/material';

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function DailyIndicators() {
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