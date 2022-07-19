import React, { useState, useEffect } from 'react';
import Context from './Context';
import materialsAPI from '../services/materialsApi';
import productsAPI from '../services/productsAPI';


const requestAllProducts = async(setProducts) => {
  const productsList = await productsAPI('GET-PRODUCTS');
  setProducts(productsList.data);
}

const requestAllMaterials = async(setMaterials) => {
  const materials = await materialsAPI('GET-MATERIALS');
  setMaterials(materials.data);
}


function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    requestAllProducts(setProducts)
    requestAllMaterials(setMaterials)
  }, [setProducts, setMaterials])
    
  
  const context = {
    products,
    setProducts,
    materials,
    setMaterials,
    ingredients,
    setIngredients,
    selectedProduct,
    setSelectedProduct
  };
  

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}


export default Provider;
