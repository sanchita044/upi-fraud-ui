import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        color: "#fff",
        backgroundImage: "url('/background.jpg')", // Add your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(253, 252, 252, 0.85)",
          borderRadius: "12px",
          padding: "3rem",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          maxWidth: "650px",
          width: "90%",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          '&:hover': {
            transform: "scale(1.05)",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Typography variant="h1" gutterBottom color="black" sx={{ fontSize: "2.8rem", fontWeight: "bold" }}>
          UPI Fraud Detection
        </Typography>
        <Typography variant="body1" paragraph color="black" sx={{ fontSize: "1.2rem", fontStyle: "italic" }}>
          Detect Fraud and Stay Safe with Your Transactions
        </Typography>
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/fraud")}
            sx={{
              fontSize: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              transition: "background 0.3s, transform 0.2s",
              '&:hover': {
                backgroundColor: "#d32f2f",
                transform: "scale(1.1)",
              },
            }}
          >
            Detect Fraud
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/scanner")}
            sx={{
              fontSize: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              transition: "background 0.3s, transform 0.2s",
              '&:hover': {
                backgroundColor: "#d32f2f",
                transform: "scale(1.1)",
              },
            }}
          >
            Scan ID
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Welcome;
