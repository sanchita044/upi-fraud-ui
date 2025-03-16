import "./welcome";
import Box from "@mui/material/Box";
import { TextField, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { predictUpiFraud } from "../service/data";
import { useState } from "react";
import image from "./hero-bg.jpg";
import dayjs from "dayjs";

function App() {
  const [prediction, setPrediction] = useState("");
  const [upiData, setUpiData] = useState({
    transDay: "",
    transMonth: "",
    transYear: "",
    upiNumber: "",
    transAmount: "",
  });

  const [errors, setErrors] = useState({ transDay: "", upiNumber: "", transAmount: "" });

  const getDate = (event) => {
    if (!event) {
      setErrors((prev) => ({ ...prev, transDay: "Date is required." }));
      return;
    }
    const selectedDate = dayjs(event);
    if (selectedDate.isAfter(dayjs(), "day")) {
      setErrors((prev) => ({ ...prev, transDay: "Future dates are not allowed." }));
      return;
    }
    setErrors((prev) => ({ ...prev, transDay: "" }));
    setUpiData((prev) => ({
      ...prev,
      transDay: selectedDate.format("DD"),
      transMonth: selectedDate.format("MM"),
      transYear: selectedDate.format("YYYY"),
    }));
  };

  const handleChange = (event, property) => {
    const { value } = event.target;
    setUpiData((prev) => ({ ...prev, [property]: value }));
    validateField(property, value);
  };

  const validateField = (field, value) => {
    let errorMsg = "";
    if (field === "upiNumber") {
      if (!value) errorMsg = "UPI Number is required.";
      else if (!/^[0-9]{10}$/.test(value)) errorMsg = "UPI Number must be 10 digits.";
    }
    if (field === "transAmount") {
      if (!value) errorMsg = "Transaction Amount is required.";
      else if (isNaN(value) || parseFloat(value) <= 0) errorMsg = "Amount must be greater than 0.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMsg }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateField("upiNumber", upiData.upiNumber);
    validateField("transAmount", upiData.transAmount);
    if (!upiData.transDay) setErrors((prev) => ({ ...prev, transDay: "Date is required." }));
    if (Object.values(errors).some((error) => error)) return;
    predictUpiFraud(upiData).then((resp) => setPrediction(resp));
  };

  return (
    <Container
      style={{
        //backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className="form-container" style={{ background: "rgba(255,255,255,0.9)", borderRadius: "8px", padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          UPI Fraud Detection
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Transaction Date"
                  onChange={(e) => getDate(e)}
                  disableFuture
                  slotProps={{ textField: { error: !!errors.transDay, helperText: errors.transDay, fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="upiNumber"
                label="UPI Number"
                type="number"
                value={upiData.upiNumber}
                onChange={(e) => handleChange(e, "upiNumber")}
                error={!!errors.upiNumber}
                helperText={errors.upiNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="transAmount"
                label="Transaction Amount"
                type="number"
                value={upiData.transAmount}
                onChange={(e) => handleChange(e, "transAmount")}
                error={!!errors.transAmount}
                helperText={errors.transAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {prediction && (
          <Box className="prediction-result" mt={2}>
            <Typography variant="h6">Prediction Result:</Typography>
            <Typography>{prediction}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;