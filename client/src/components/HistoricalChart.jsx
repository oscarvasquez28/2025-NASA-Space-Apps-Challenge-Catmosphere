import {Card, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import { LineChart } from '@mui/x-charts';


function HistoricalChart() {
  const dayTranslations = {
    'Mon': 'Lunes',
    'Tue': 'Martes',
    'Wed': 'Miércoles',
    'Thu': 'Jueves',
    'Fri': 'Viernes',
    'Sat': 'Sábado',
    'Sun': 'Domingo'
  };

  const getDayAbbreviation = (date) => date.toString().split(' ')[0];

  const todayAbbr = getDayAbbreviation(new Date());
  const nextDaysAbbr = [];
  for (let i = 1; i <= 4; i++) {
    const nextDay = new Date();
    nextDay.setDate(new Date().getDate() + i);
    nextDaysAbbr.push(getDayAbbreviation(nextDay));
  }

  const englishDays = [todayAbbr, ...nextDaysAbbr];
  const Days = englishDays.map(day => dayTranslations[day]);

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