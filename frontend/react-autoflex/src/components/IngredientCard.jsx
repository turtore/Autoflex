import React, { useContext } from 'react'
import Context from '../context/Context'
import { Card, Button } from 'react-bootstrap'
import ingredientsAPI from '../services/ingredientsApi'


const IngredientCard = ({ ingredient }) => {

    const { materials, refreshIngredients } = useContext(Context)

  
  const handleDelete = async (id, productId) => {
    await ingredientsAPI('DELETE-INGREDIENT', id)
    refreshIngredients(productId)
  }

  const changeAmount = (id) => {
    console.log('this will change amount')
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
            onClick={ () => handleDelete(`${ingredient.id}`, `${ingredient.productId}`) }
            >
            Delete
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}



export default IngredientCard
