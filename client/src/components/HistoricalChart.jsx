import {Card, CardContent } from '@mui/material';
import Container from '@mui/material/Container';

function HistoricalChart() {
  return (
    <Container>
      <Card>
        <CardContent sx={{ minWidth: 300, minHeight: 200, textAlign: 'center',placeContent: 'center' }}>
          HistoricalChart
        </CardContent>
      </Card>
    </Container>
  )
}

export default HistoricalChart