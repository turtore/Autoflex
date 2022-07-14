import React, { useContext, useEffect, useState } from 'react';
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
  }, setProducts)

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

  const handleDelete = (id) => {
    productsAPI('deleteProduct', id)

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

      <button
        onClick={handleClick}
      >
          register
      </button>

      <ul>
        { products.map((product) => 
        <div>
            <li>{product.name} | {product.value}</li>
            <button
            id={product.id}
            onClick={ () => handleDelete(`${product.id}`) }
            >delete</button>
        </div>
        )}        
      </ul>
      
    </div>
  )
}

export default ProductPage;
