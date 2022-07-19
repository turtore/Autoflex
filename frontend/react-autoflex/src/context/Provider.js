import React, { useState, useEffect } from 'react'
import Context from './Context'
import materialsAPI from '../services/materialsApi'
import productsAPI from '../services/productsAPI'
import ingredientsAPI from '../services/ingredientsApi'


const requestAllProducts = async(setProducts) => {
  const productsList = await productsAPI('GET-PRODUCTS')
  console.log(productsList)
  setProducts(productsList.data)
}

const requestAllMaterials = async(setMaterials) => {
  const materials = await materialsAPI('GET-MATERIALS')
  setMaterials(materials.data)
}

const requestIngredients = async(setIngredients, id) => {
  const ingredients = await ingredientsAPI('GET-INGREDIENTS', id)
  setIngredients(ingredients.data)

}

const requestProductInfo = async(setSelectedProduct, id) => {
  const product = await productsAPI('GET-PRODUCT-ID', id)
  setSelectedProduct(product.data)
}


function Provider({ children }) {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])
  const [materials, setMaterials] = useState([])
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    requestAllProducts(setProducts)
    requestAllMaterials(setMaterials)
  }, [setProducts, setMaterials])


  const refreshAll = async () => {
    requestAllProducts(setProducts)
    requestAllMaterials(setMaterials)
  }

  const refreshIngredients = async (productId) => {
    requestIngredients(setIngredients, productId);
    requestProductInfo(setSelectedProduct, productId);
  }
    
  
  const context = {
    products,
    setProducts,
    materials,
    setMaterials,
    ingredients,
    setIngredients,
    selectedProduct,
    setSelectedProduct,
    refreshAll,
    refreshIngredients,
  }
  

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  )
}


export default Provider
