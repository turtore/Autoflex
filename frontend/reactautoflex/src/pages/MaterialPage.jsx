import React, { useState } from 'react';

const MaterialPage = () => {
    const [inputsState, setInputsState] = useState({
      name: '',
      quantity: '',
    });
    
    const handleChange = ({ target: { name, value } }) => {
      setInputsState({
        ...inputsState,
        [name]: value,
      });
    };

    const handleClick = () => {
      const material = {
        name: inputsState.name,
        quantity: inputsState.quantity,
      };
      console.log(material);
    }
        
    
  return (
    <div>
      <h2>Register a new Material</h2>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          onChange={handleChange}
          value={inputsState.name}
          name="name"
        />
    
        <label htmlFor="value">Quantity: </label>
        <input
          type="number"
          onChange={handleChange}
          value={inputsState.value}
          name="quantity"
        />

        <button
        onClick={handleClick}
        >
            register
        </button>
        
      </div>
  )
}

export default MaterialPage;
