// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Data from './components/Data';
import Training from './components/Training';
import Test from './components/Test';
import Header from './components/Header';
import { CSVDataProvider } from './CSVDataContext';
import './style.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar bg-dark">
            <nav>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/data">Data</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/training">Training</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/test">Test</Link>
                </li>
              </ul>
            </nav>
          </Col>
          <Col md={9} className="main-content">
            <Routes>
              <Route path="/data" element={<Data />} />
              <Route path="/training" element={<Training />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
      <CSVDataProvider>
        <App />
      </CSVDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);