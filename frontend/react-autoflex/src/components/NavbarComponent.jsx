import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const NavbarComponent = () => {
  
  const navigate = useNavigate()

  
  const goToPage = (toPage) => {
    navigate(toPage)
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
  )
}


export default NavbarComponent
