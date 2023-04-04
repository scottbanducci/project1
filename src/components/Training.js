import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { fetchDatasetNames  } from "../utils/firebaseUtils";
import axios from 'axios';
import { fetchCSV } from "../utils/csvUtils";
import SimpleVisualization from "../components/simpleVisualization";

const fetchPreprocessedCSV = async (datasetName, algorithmName) => {
  const response = await axios.get(`/preprocess-csv?dataset=${datasetName}&algorithm=${algorithmName}`);
  return response.data;
};

const Training = () => {
  const [datasetNames, setDatasetNames] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [showVisualization, setShowVisualization] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const datasets = await fetchDatasetNames();
      setDatasetList(datasets);
    }

    fetchData();

  }, []);

  const handleChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleContinue = async () => {
    const csvData = await fetchPreprocessedCSV(selectedDataset, selectedAlgorithm);
    setData(csvData);
    setShowVisualization(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Training</Typography>
      </Grid>
      {!showVisualization && (
        <>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-dataset-label">Select Dataset</InputLabel>
              <Select
                labelId="select-dataset-label"
                value={selectedDataset}
                onChange={handleChange}
                label="Select Dataset"
              >
                {datasetNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-algorithm-label">Select Algorithm</InputLabel>
              <Select
                labelId="select-algorithm-label"
                value={selectedAlgorithm}
                onChange={handleAlgorithmChange}
                label="Select Algorithm"
                disabled={!selectedDataset}
              >
                {["Algorithm1", "Algorithm2", "Algorithm3"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedDataset || !selectedAlgorithm}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Grid>
        </>
      )}
      {showVisualization && (
        <Grid item xs={12}>
          <SimpleVisualization data={data} />
        </Grid>
      )}
    </Grid>
  );
};

export default Training;
