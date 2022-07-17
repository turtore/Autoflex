import React, { useState, useContext } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import Context from '../context/Context';
import productsAPI from '../services/productsAPI';

const ProductCard = ({ product }) => {
  const { productsItems,
    setProductsItems,
  } = useContext(Context);


  const changeCartItems = (quantity) => {
    const filterProduct = productsItems.filter(({ id }) => id !== product.id);

    setProductsItems([
      ...filterProduct,
      { ...product, quantity },
    ]);
  };

  const handleDelete = (id) => {
    productsAPI('DELETE-PRODUCT', id)

  }
  
  const logOut = () => {
    console.log("cliquei no card");
  }

  return (
    <Card className="product-card"
    onClick={logOut}
    >
      <Card.Body>
        <Card.Title>
          { product.name }
        </Card.Title>
        <Card.Text>
          { product.id }
        </Card.Text>
        <Card.Text>
          { product.value }
        </Card.Text>

        <Button
          type="button"
          onClick={ () => handleDelete(`${product.id}`) }
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};


export default ProductCard;
