import axios from 'axios';

export default async function ingredientsAPI(caseInput, bodyValue) {
  switch (caseInput) {
  case 'REGISTER-INGREDIENT': {
    try {
      const newProduct = await axios({ method: 'post',
        url: 'http://localhost:8080/ingredients',
        data: bodyValue,
      });
      return newProduct.data;
    } catch (error) {
      return console.log("error");;
    }
  }
  case 'GET-INGREDIENTS': {
    const allingredients = await axios({ method: 'get',
      url: `http://localhost:8080/ingredients/${bodyValue}/product`,
    });
    return allingredients;
  }
  case 'DELETE-INGREDIENT': {
    const deleted = await axios({ method: 'delete',
    url: `http://localhost:8080/ingredients/${bodyValue}`,
  });
    return deleted;
  }
  
  default:
    return console.log('missing args');
  }
}
