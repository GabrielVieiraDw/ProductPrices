import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";

export default function FileUpload({ onUploadComplete }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log("JSON sendo enviado:", jsonData);

        await axios.post(`${import.meta.env.VITE_API_URL}/prices`, jsonData, {
          headers: { "Content-Type": "application/json" },
        });

        onUploadComplete();
      } catch (error) {
        console.error("Erro ao processar JSON antes do envio", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <Box mt={2}>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        id="upload-file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-file">
        <Button variant="contained" component="span" disabled={loading}>
          Upload JSON
        </Button>
      </label>
      {loading && <CircularProgress size={24} />}
    </Box>
  );
}