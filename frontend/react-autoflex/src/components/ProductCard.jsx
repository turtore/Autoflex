import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import productsAPI from '../services/productsAPI';

const ProductCard = ({ product }) => {

  const history = useHistory()

  const goToDetails = (id) => {
    history.push(`/products/${id}`)
  }

  const handleDelete = (id) => {
    productsAPI('DELETE-PRODUCT', id)

  }
  

  return (
    <Card className="product-card"
      onClick={() => goToDetails(`${product.id}`)}
    >
      <Card.Body>
        <Button>

        <Card.Title>
          name: { product.name }
        </Card.Title>
        <Card.Text>
          id: { product.id }
        </Card.Text>
        <Card.Text>
          value: { product.value }
        </Card.Text>

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