import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
//import './style.css';



const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col> 
          {/* Sidebar content goes here */}
          <div md={3} className="bg-light">
           <Button>Click meeeeee!</Button>
          </div>
        </Col>
        <Col md={9}>
          {
          /* Main content goes here */
          <div>
          <h1>Hello, World!</h1>
          <Button variant="primary">Click me!</Button>
        </div>
          }
        </Col>
      </Row>
    </Container>
   
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
