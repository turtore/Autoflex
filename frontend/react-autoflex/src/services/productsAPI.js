import axios from 'axios';

export default async function productsAPI(caseInput, bodyValue) {
  switch (caseInput) {
  case 'REGISTER-PRODUCT': {
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
  case 'GET-PRODUCTS': {
    const allProducts = await axios({ method: 'get',
      url: 'http://localhost:8080/products',
    });
    return allProducts;
  }
  case 'GET-PRODUCT-ID': {
    const product = await axios({ method: 'get',
      url: `http://localhost:8080/products/${bodyValue}`,
    });
    return product;
  }
  case 'DELETE-PRODUCT': {
    const deleted = await axios({ method: 'delete',
    url: `http://localhost:8080/products/${bodyValue}`,
  });
  }
  
  default:
    return console.log('missing args');
  }
}
