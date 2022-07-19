import React from 'react'
import { Container } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'


const WelcomePage = () => {

  return (
    <Container>
        <NavbarComponent />
        <h1>
            Welcome!
        </h1>
    </Container>    
  )
}

export default WelcomePage
