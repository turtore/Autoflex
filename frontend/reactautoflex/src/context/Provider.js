import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    
  
    const context = {
      products,
      setProducts,
      materials,
      setMaterials,
      ingredients,
      setIngredients,
    };
  

    return (
      <Context.Provider value={ context }>
        {children}
      </Context.Provider>
    );
  }


  export default Provider;