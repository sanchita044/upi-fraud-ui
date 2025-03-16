import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Typography, CircularProgress, Box, Container } from "@mui/material";
import axios from "axios";
import image from "./hero-bg.jpg"; // Ensure the same background image is used

const QRScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [fraudStatus, setFraudStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async (text) => {
    if (!text) return;
    setScanResult(text);
    setFraudStatus("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/check_upi", { upi_id: text });
      setFraudStatus(response.data.fraud ? "⚠️ Fraudulent Transaction Detected!" : "✅ Safe to Proceed");
    } catch (error) {
      setFraudStatus("Error checking fraud status.");
    } finally {
      setLoading(false);
    }
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
      <Box className="form-container" style={{ background: "rgba(255,255,255,0.9)", borderRadius: "8px", padding: "2rem", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Scan UPI QR Code
        </Typography>
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result?.text);
          }}
          style={{ width: "100%" }}
        />
        {scanResult && <Typography variant="h6">Scanned Data: {scanResult}</Typography>}
        {loading ? <CircularProgress /> : fraudStatus && <Typography variant="h6">{fraudStatus}</Typography>}
      </Box>
    </Container>
  );
};

export default QRScanner;






