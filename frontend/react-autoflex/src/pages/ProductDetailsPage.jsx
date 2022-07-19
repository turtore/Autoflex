import React, { useState, useContext, useEffect } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Context from '../context/Context'
import NavbarComponent from '../components/NavbarComponent'
import ingredientsAPI from '../services/ingredientsApi'
import IngredientCard from '../components/IngredientCard'


const ProductDetailsPage = () => {

  const [inputsState, setInputsState] = useState({
    materialId: '',
    quantity: '',
  })
  
  const { setIngredients,
    ingredients,
    selectedProduct,
    refreshIngredients } = useContext(Context)
    
    const { id } = useParams()
    
    
    useEffect(() => {
      refreshIngredients(id)
  }, [setIngredients])
  
  
  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    })
  }
  
  
  const handleRegister = async () => {
    const ingredient = {
      quantity: inputsState.quantity,
      materialId: inputsState.materialId,
      productId: id
    }
    await ingredientsAPI('REGISTER-INGREDIENT', ingredient)
    refreshIngredients(id);
  }
  
  
  return (
    <Container>
      <NavbarComponent />
      <FloatingLabel
      label='Product Info'      
      />
      <Container>
        <h4> Id: {selectedProduct.id}  </h4>
        <h4> Name: {selectedProduct.name}  </h4>
        <h4> Value: {selectedProduct.value}  </h4>
      </Container>
      
      <br />
      <Container>
        <FloatingLabel
          label='Add Ingredient'/>
        <Form>
          <FloatingLabel
            label='Quantity'
          />
          <Form.Control
            type='number'
            onChange={handleChange}
            value={inputsState.quantity}
            name='quantity'
          />

          <FloatingLabel
            label='Material Id'
          />
          <Form.Control
            type='number'
            onChange={handleChange}
            value={inputsState.materialId}
            name='materialId'
          />
          </Form>
        
          <Button
            onClick={handleRegister}
          >
            Register
          </Button>
      </Container>        

      <Container>
        <FloatingLabel
        label='Recipe:'
        />
      { ingredients.map((ingredient) => (
        <IngredientCard key={ ingredient.id } ingredient = { ingredient } />
        )
        )}      
      </Container>

    </Container>
  )
}

export default ProductDetailsPage
