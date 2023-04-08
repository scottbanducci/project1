import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { fetchModelNames } from "../utils/firebaseUtils";

const Test = () => {
  const [modelNames, setModelNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const models = await fetchModelNames();
      setModelNames(models);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <Form>
        {/* Add more form elements for model selection and parameters */}
        <Form.Group>
          <Form.Label htmlFor="model">Select Model</Form.Label>
          <Form.Control as="select" name="model" id="model">
            {modelNames.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="testDataset">Upload Test Dataset</Form.Label>
          <Form.Control
            type="file"
            name="testDataset"
            id="testDataset"
            accept=".csv"
          />
        </Form.Group>
        {/* Add more form elements for other parameters */}
        <Button onClick={() => console.log("Test the model")}>Test</Button>
      </Form>
    </div>
  );
};

export default Test;
