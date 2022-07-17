import React, { useContext, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Context from '../context/Context';
import productsAPI from '../services/productsAPI';


const requestAllProducts = async(setProducts) => {
  const productsList = await productsAPI('getProducts');
  setProducts(productsList.data);
  console.log(productsList);
}

const ProductPage = () => {

  const { setProducts, products } = useContext(Context)

  const [inputsState, setInputsState] = useState({
    name: '',
    value: '',
  });

  useEffect(() => {
    requestAllProducts(setProducts);
  }, [setProducts])

  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
  };

  const handleClick = () => {
    const product = {
      name: inputsState.name,
      value: inputsState.value,
    };
    productsAPI('registerProduct', product)
  }


  return (
    <div>
      <h2>Register a new Product</h2>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        onChange={handleChange}
        value={inputsState.name}
        name="name"
      />

      <label htmlFor="value">Value: </label>
      <input
        type="number"
        onChange={handleChange}
        value={inputsState.value}
        name="value"
      />

      <Button
        onClick={handleClick}
      >
          register
      </Button>

      <br/>
      <br/>

        { products.map((product) => (
          <ProductCard key={ product.id } product = { product } />
        )
        )}
      
    </div>
  )
}

export default ProductPage;
