import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/data">
        Data
      </Nav.Link>
      <Nav.Link as={Link} to="/training">
        Training
      </Nav.Link>
      <Nav.Link as={Link} to="/test">
        Test
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
