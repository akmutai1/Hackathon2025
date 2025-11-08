import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";

export default function ResultsPage() {
  const location = useLocation();
  const data = location.state?.data;

  if (!data) return (<Box p={3}><Typography>No Report Found</Typography><Link to="/dashboard">Upload first</Link></Box>);
  if (data.error) return (<Box p={3}><Typography>Error</Typography><Typography>{data.details}</Typography><Link to="/dashboard">Try again</Link></Box>);

  return (
    <Box p={3}>
      <Typography variant="h4">Your Simplified Report</Typography>
      {data.simplified_terms?.map((item, idx) => (
        <Paper key={idx} sx={{ p: 2, my: 1 }}>
          <Typography variant="h6">{item.term}</Typography>
          <Typography><strong>Meaning:</strong> {item.meaning}</Typography>
          <Typography><strong>Why it matters:</strong> {item.why_it_matters}</Typography>
        </Paper>
      ))}
      <Link to="/dashboard">Simplify another report</Link>
    </Box>
  );
}
