import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Test = () => {
  return (
    <div>
      <h1>Test</h1>
      <Form>
        {/* Add more form elements for model selection and parameters */}
        <Form.Group>
          <Form.Label htmlFor="model">Select Model</Form.Label>
          <Form.Control as="select" name="model" id="model">
            <option>Model 1</option>
            <option>Model 2</option>
            <option>Model 3</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="testDataset">Upload Test Dataset</Form.Label>
          <Form.Control type="file" name="testDataset" id="testDataset" accept=".csv" />
        </Form.Group>
        {/* Add more form elements for other parameters */}
        <Button onClick={() => console.log('Test the model')}>Test</Button>
      </Form>
    </div>
  );
};

export default Test;