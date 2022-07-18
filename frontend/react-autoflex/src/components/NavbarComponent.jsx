import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const NavbarComponent = () => {
  
  const history = useHistory()

  
  const goToPage = (toPage) => {
    history.push(toPage)
}

  return (
    <Container className="navbar-container">
      <Navbar>
        <Button
          type="button"
          onClick={() => goToPage('/products') }
        >
          Products
        </Button>
        <Button
          type="button"
          onClick={() => goToPage('/materials') }
        >
          Materials
        </Button>
      </Navbar>
    </Container>
  );
};


export default NavbarComponent;
