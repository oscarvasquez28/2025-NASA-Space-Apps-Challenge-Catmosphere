import {Card, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import { LineChart } from '@mui/x-charts';


function HistoricalChart() {
  const Today = new Date().toString().split(' ')[0];
  const nextDays = [];
  for (let i = 1; i <= 4; i++) {
    const nextDay = new Date();
    nextDay.setDate(new Date().getDate() + i);
    nextDays.push(nextDay.toString().split(' ')[0]);
  }
  const Days = [Today, ...nextDays];
  return (
    <Container>
      <Card>
        <CardContent sx={{ minWidth: 300, minHeight: 200, textAlign: 'center', placeContent: 'center' }}>
          <LineChart
            series={[{ data: [1, 2, 3, 4, 3] }]}
            xAxis={[{ scaleType: 'point', data: Days }]}
          />
        </CardContent>
      </Card>
    </Container>
  )
}

export default HistoricalChart