import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import NavbarComponent from '../components/NavbarComponent';
import ingredientsAPI from '../services/ingredientsApi';
import productsAPI from '../services/productsAPI';
import IngredientCard from '../components/IngredientCard';


const requestIngredients = async(setIngredients, id) => {
  const ingredients = await ingredientsAPI('GET-INGREDIENTS', id)
  setIngredients(ingredients.data)

}

const requestProductInfo = async(setSelectedProduct, id) => {
  const product = await productsAPI('GET-PRODUCT-ID', id)
  setSelectedProduct(product.data)
}


const ProductDetailsPage = () => {

  const [inputsState, setInputsState] = useState({
    materialId: '',
    quantity: '',
  });
  
  const { setIngredients,
    ingredients,
    materials,
    selectedProduct,
    setSelectedProduct } = useContext(Context)
    
    const { id } = useParams();
    
    
    useEffect(() => {
      requestIngredients(setIngredients, id)
      requestProductInfo(setSelectedProduct, id)
  }, [setIngredients])
  
  
  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
  };
  
  
  const handleClick = () => {
    const ingredient = {
      quantity: inputsState.quantity,
      materialId: inputsState.materialId,
      productId: id
    };
    ingredientsAPI('REGISTER-INGREDIENT', ingredient)
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
            onClick={handleClick}
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
