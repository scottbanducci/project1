import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const Training = () => {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');

  useEffect(() => {
    const storedDatasets = Object.keys(localStorage).filter((key) =>
      key.endsWith('.csv')
    );
    setDatasets(storedDatasets);
  }, []);

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  return (
    <div>
      <h1>Training</h1>
      <Form>
        {/* Add more form elements for dataset selection and parameters */}
        <Form.Group>
          <Form.Label htmlFor="dataset">Select Dataset</Form.Label>
          <Form.Control
            as="select"
            name="dataset"
            id="dataset"
            value={selectedDataset}
            onChange={handleDatasetChange}
          >
            {datasets.map((dataset) => (
              <option key={dataset} value={dataset}>
                {dataset}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="library">Select Library</Form.Label>
          <Form.Control as="select" name="library" id="library">
            <option>sklearn</option>
            <option>PyTorch</option>
            <option>TensorFlow</option>
          </Form.Control>
        </Form.Group>
        {/* Add more form elements for other parameters */}
        <Button onClick={() => console.log('Train the model')}>Train</Button>
      </Form>
    </div>
  );
};

export default Training;
