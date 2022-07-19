import React, { useContext, useState } from 'react'
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import Context from '../context/Context'
import productsAPI from '../services/productsAPI'
import NavbarComponent from '../components/NavbarComponent'


const ProductPage = () => {

  const { products, refreshAll } = useContext(Context)

  const [inputsState, setInputsState] = useState({
    name: '',
    value: '',
  })


  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    })
  }

  const handleClick = async () => {
    const product = {
      name: inputsState.name,
      value: inputsState.value,
    }
    await productsAPI('REGISTER-PRODUCT', product)
    setInputsState({name:'', value:''})
    refreshAll()
  }


  return (
    <Container>
      <NavbarComponent />
        <Container>
          <FloatingLabel
          label='Register a new Product'/>
          <Form>
            <FloatingLabel
              label='Name'
            />
            <Form.Control
              type='text'
              onChange={handleChange}
              value={inputsState.name}
              name='name'
            />

            <FloatingLabel
              label='Value'
            />
            <Form.Control
              type='number'
              onChange={handleChange}
              value={inputsState.value}
              name='value'
            />
          </Form>
        
          <Button
            onClick={handleClick}
          >
            Register
          </Button>
        </Container>
        <br/>
        <FloatingLabel
          label='Registered Products'
        />
        <Container>
        { products.map((product) => (
          <ProductCard key={ product.id } product = { product } />
          )
          )}      
        </Container>
    </Container>
  )
}

export default ProductPage
