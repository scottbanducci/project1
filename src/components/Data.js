// src/pages/Data.js
import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { CSVDataContext } from '../CSVDataContext';

const CustomInput = styled(Input)(({ theme }) => ({
  display: 'none',
}));

const PreviewContainer = styled(Paper)(({ theme }) => ({
  marginTop: '2rem',
  padding: '1rem',
  backgroundColor: '#313131',
  border: '2px solid #3f51b5',
  borderRadius: '1rem',
  overflowX: 'auto',
  maxHeight: 400,
  '&::-webkit-scrollbar': {
    width: '0.4em',
    borderRadius: '1rem',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#3f51b5',
    borderRadius: '1rem',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  borderBottom: '1px solid #5e5e5e',
  padding: theme.spacing(1),
}));

const StyledTableCellList = styled(TableCell)(({ theme }) => ({
  color: '#000',
  borderBottom: '1px solid #5e5e5e',
  padding: theme.spacing(1),
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
  },
}));

const Data = () => {
  const { csvData, setCsvData } = useContext(CSVDataContext);
  const [previewData, setPreviewData] = useState(null);
  const [datasets, setDatasets] = useState([]);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const lines = data.split('\n');
      const parsedData = lines.map((line) => line.split(','));
      setCsvData(parsedData);
      setPreviewData(parsedData);
      // Save the data to local storage
      localStorage.setItem(file.name, JSON.stringify(parsedData));

    };

    reader.readAsText(file);
  };


  useEffect(() => {
    const storedDatasets = Object.keys(localStorage).filter((key) =>
      key.endsWith('.csv')
    );
    setDatasets(storedDatasets);
  }, []);
  
  return (
    <div>
      <label htmlFor="upload-csv">
        <Button variant="contained" color="primary" component="span">
          Upload CSV
        </Button>
      </label>
      <CustomInput
        id="upload-csv"
        type="file"
        inputProps={{ accept: '.csv' }}
        onChange={handleFileUpload}
      />
      {previewData && (
        <PreviewContainer>
          <TableContainer>
            <Table size="small" aria-label="CSV Preview">
              <TableHead>
                <TableRow>
                  {previewData[0].map((header, index) => (
                    <StyledTableCell key={index}>{header}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.slice(1).map((row, rowIndex) => (
                  <StyledTableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <StyledTableCell key={cellIndex}>{cell}</StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PreviewContainer>
      )}
      <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h6">Uploaded Datasets</Typography>
        <TableContainer>
          <Table size="small" aria-label="Uploaded Datasets">
            <TableHead>
              <TableRow>
                <StyledTableCellList>ID</StyledTableCellList>
                <StyledTableCellList>Dataset</StyledTableCellList>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasets.map((dataset, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCellList>{index + 1}</StyledTableCellList>
                  <StyledTableCellList>{dataset}</StyledTableCellList>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Data;
