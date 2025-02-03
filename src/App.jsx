import { useState, useEffect } from "react";
import { Container, TextField, CircularProgress } from "@mui/material";
import PricesGrid from "./components/PricesGrid";
import FileUpload from "./components/FileUpload";
import axios from "axios";

export default function App() {
  const [country, setCountry] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (country) {
      fetchPrices();
    }
  }, [country]);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/prices?country=${country}`);
      setPrices(response.data);
    } catch (error) {
      console.error("Error to find prices", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Product Prices</h1>
      <TextField
        label="Filter by Country"
        variant="outlined"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
      />
      {loading ? <CircularProgress /> : <PricesGrid prices={prices} />}
      <FileUpload onUploadComplete={fetchPrices} />
    </Container>
  );
}
