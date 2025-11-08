import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import HealthChatbot from "./HealthChatbot";
import HealthQuiz from "./HealthQuiz";

<Box sx={{ mt: 4 }}>
  <HealthChatbot />
  <HealthQuiz />
</Box>


export default function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !text) return alert("Upload PDF or paste text.");
    setIsLoading(true);

    try {
      const token = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      let response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        response = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" }
        });
      } else {
        response = await axios.post("http://localhost:5000/api/upload", { text }, { headers });
      }

      navigate("/results", { state: { data: response.data } });
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Patient Dashboard</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Typography variant="h6">Upload PDF</Typography>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} disabled={!!text || isLoading} />

        <Typography align="center" sx={{ my: 2 }}>--- OR ---</Typography>

        <TextField label="Paste Medical Text" multiline rows={10} fullWidth value={text} onChange={e => setText(e.target.value)} disabled={!!file || isLoading} />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isLoading}>
          {isLoading ? "Simplifying..." : "Simplify My Report"}
        </Button>
      </Box>
    </Box>
  );
}
