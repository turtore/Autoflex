import React from 'react'
import { useHistory } from 'react-router-dom';


const WelcomePage = () => {

    const history = useHistory();


    const goToPage = (toPage) => {
        history.push(toPage)
    }


  return (
    <div>
        <button
        onClick={() => goToPage('/products')}
        >
            Product
        </button>
        <button
        onClick={() => goToPage('/materials')}
        >
            Material
        </button>
        <button
        onClick={() => goToPage('/ingredients')}
        >
            Ingredient
        </button>
    </div>
  )
}

export default WelcomePage;
