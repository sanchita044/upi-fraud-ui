import './App.css';
import Box from '@mui/material/Box';
import { TextField, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { predictUpiFraud } from './service/data';
import { useState, useEffect } from 'react';
import image from './hero-bg.jpg';

function App() {
  const [prediction, setPrediction] = useState('');
  const [upiData, setUpiData] = useState({
    transDay: '',
    transMonth: '',
    transYear: '',
    upiNumber: '',
    transAmount: '',
  });

  useEffect(() => {}, [upiData]);

  const handleChange = (event, property) => {
    setUpiData({ ...upiData, [property]: event.target.value });
  };

  const getDate = (event) => {
    const dateObj = new Date(event.$d);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateObj);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
    setUpiData((prevState) => ({
      ...prevState,
      transDay: day,
      transMonth: month,
      transYear: year,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      transDay: upiData.transDay,
      transMonth: upiData.transMonth,
      transYear: upiData.transYear,
      upiNumber: upiData.upiNumber,
      transAmount: upiData.transAmount,
    };
    predictUpiFraud(data).then((resp) => {
      console.log(resp);
      setPrediction(resp);
    });
  };

  return (
    <Container
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        className="form-container"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom>
          UPI Fraud Detection
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    name="date"
                    id="date"
                    label="Transaction Date"
                    onChange={(e) => getDate(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="upiNumber"
                label="UPI Number"
                type="number"
                id="upiNumber"
                onChange={(e) => handleChange(e, 'upiNumber')}
                value={upiData.upiNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="transAmount"
                label="Transaction Amount"
                id="transAmount"
                type="number"
                onChange={(e) => handleChange(e, 'transAmount')}
                value={upiData.transAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        {prediction && (
          <Box className="prediction-result">
            <Typography variant="h6">Prediction Result:</Typography>
            <Typography variant="body1">{prediction}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
