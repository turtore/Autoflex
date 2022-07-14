import React, { useState } from 'react';

const ProductPage = () => {

  const [inputsState, setInputsState] = useState({
    name: '',
    value: '',
  });

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
    console.log(product);
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
      
    </div>
  )
}

export default ProductPage;
