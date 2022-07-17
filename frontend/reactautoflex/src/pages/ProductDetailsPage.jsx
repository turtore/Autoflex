import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import NavbarComponent from '../components/NavbarComponent';
import ingredientsAPI from '../services/ingredientsApi';
import productsAPI from '../services/productsAPI';


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
    requestIngredients(setIngredients, id);
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

  const handleDelete = (id) => {
    ingredientsAPI('DELETE-INGREDIENT', id)
  }

  const logger = () => {
    console.log(materials);
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
        <button
        onClick={logger}
        >LOG MATERIALS</button>
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
        <br/>
      <Container>
        <FloatingLabel
        label='Recipe'
        />
      <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>quantity</th>
                <th>Material Id</th>
              </tr>
            </thead>

            <tbody>
              { ingredients.map((ingredient) => (
                <tr key={ingredient.id}>
                  <td>{ ingredient.quantity }</td>
                  <td>{ ingredient.materialId }</td>
                  <td>
                    <Button
                    type='button'
                    onClick={ () => handleDelete(`${ingredient.id}`) }
                    >
                      Remove Ingredient
                    </Button>
                  </td>
                </tr>                
                )                
              )}
            </tbody>
            
          </table>
      </Container>

    </Container>
  )
}

export default ProductDetailsPage
