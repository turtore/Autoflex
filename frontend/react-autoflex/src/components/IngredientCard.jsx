import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { Card, Button } from 'react-bootstrap';
import ingredientsAPI from '../services/ingredientsApi';


const IngredientCard = ({ ingredient }) => {

    const { materials } = useContext(Context)

  
  const handleDelete = (id) => {
    ingredientsAPI('DELETE-INGREDIENT', id)
  }

  const changeAmount = (id) => {
    console.log('this will change amount');
  }

  const getMaterialName = (materialId) => {
    for (let i = 0; i < materials.length ; i++) {
      if (materials[i].id === parseInt(materialId) ) {
        return materials[i].name
      }
    }
    return null
  }
  

  return (
    <Card className="ingredient-card">
      <Card.Body>        
        <Card.Text>
          { getMaterialName(`${ingredient.materialId}`) } [id: { ingredient.materialId }]
          <br/> 
          Quantity: { ingredient.quantity }
          <Button
            type='button'
            onClick={ () => changeAmount(`${ingredient.id}`) }
            >
            Change Amount
          </Button>
          <br/>
          <Button
            type='button'
            onClick={ () => handleDelete(`${ingredient.id}`) }
            >
            Delete
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};


export default IngredientCard;
