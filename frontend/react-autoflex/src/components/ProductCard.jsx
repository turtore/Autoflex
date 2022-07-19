import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import productsAPI from '../services/productsAPI';


const ProductCard = ({ product }) => {

  const navigate = useNavigate()

  const goToDetails = (id) => {
    navigate(`/products/${id}`)
  }

  const handleDelete = (id) => {
    productsAPI('DELETE-PRODUCT', id)

  }
  

  return (
    <Card className="product-card">
      <Card.Body>
        <Button>
          <Button
          onClick={() => goToDetails(`${product.id}`)}
          > 
            Ingredients
          </Button>
          <Card.Title>
            [id: { product.id }] { product.name }
            <br/>
            Value: { product.value }
          </Card.Title>
          <Button
            type='button'
            onClick={ () => handleDelete(`${product.id}`) }
            >
              Delete
          </Button>
        </Button>
      </Card.Body>
    </Card>
  );
};


export default ProductCard;
