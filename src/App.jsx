import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Row } from 'reactstrap';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {predictUpiFraud} from './service/data';
import { useState,useEffect} from "react";
import Button from '@mui/material/Button';
function App() {
  const [prediction,setPrediction]=useState('');
  const [upiData,setUpiData]=useState({
     transDay:'',
     transMonth:'',
     transYear:'',
     upiNumber:'',
     transAmount:''
 });

  useEffect(()=>{
  },[upiData]);

  const handleChange=(event,property)=>{
    setUpiData({...upiData,[property]:event.target.value})
  }

  const getDate=(event)=>{
     const dateObj = new Date(event.$d);
     const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dateObj);
     const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(dateObj);
     const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateObj);
     setUpiData((prevState) => ({
        ...prevState,
        transDay: day,
        transMonth: month,
        transYear: year,
      }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      transDay:upiData.transDay,
      transMonth:upiData.transMonth,
      transYear:upiData.transYear,
      upiNumber:upiData.upiNumber,
      transAmount:upiData.transAmount
    };
    predictUpiFraud(data).then((resp)=>{
      console.log(resp);
      setPrediction(resp);
    })
  };
  return (
    <>
     <Container>
        <form onSubmit={handleSubmit}>
          <Row>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                  <DatePicker name="date" id="date" label="date" onChange={(e)=>getDate(e)}/>
              </DemoContainer>
            </LocalizationProvider>
          </Row>
          <Row>
              <TextField variant="outlined" required name="upiNumber" label="UPI NUMBER" id="upiNumber"  onChange={(e)=>handleChange(e,"upiNumber")}
              value={upiData.upiNumber}/>
          </Row>
          <Row>
              <TextField variant="outlined" required name="transAmount" label="TRANSACTION AMOUNT" id="transAmount" onChange={(e)=>handleChange(e,"transAmount")}
              value={upiData.transAmount}/>
          </Row>
          <Row>
            <Button type="submit" fullWidth variant="contained" color="primary">
                Submit
            </Button>
          </Row>
        </form>
        <br/>
        {prediction !== null && (
                <div>
                    <h2>{prediction}</h2>
                </div>
      )}
      </Container>
    </>
  )
}

export default App
