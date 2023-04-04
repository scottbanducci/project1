import React from "react";
import { Typography } from "@mui/material";

const SimpleVisualization = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography variant="h6">No data available.</Typography>;
  }

  const dimensions = data[0].length;

  return (
    <div>
      <Typography variant="h6">Dataset Dimensionality:</Typography>
      <Typography variant="h4">{dimensions}</Typography>
    </div>
  );
};

export default SimpleVisualization;
