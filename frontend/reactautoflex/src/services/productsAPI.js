import axios from 'axios';

export default async function productsAPI(caseInput, bodyValue) {
  switch (caseInput) {
  case 'registerProduct': {
    try {
      const newProduct = await axios({ method: 'post',
        url: 'http://localhost:8080/products',
        data: bodyValue,
      });
      return newProduct.data;
    } catch (error) {
      return console.log("error");;
    }
  }
  case 'getProducts': {
    const allProducts = await axios({ method: 'get',
      url: 'http://localhost:8080/products',
    });
    return allProducts;
  }
  default:
    return console.log('missing args');
  }
}
