import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome";
import Fraud from "./components/fraud";
import Scanner from "./components/scanner";
import "./App.css"; // Import global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/fraud" element={<Fraud />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </Router>
  );
}

export default App;
