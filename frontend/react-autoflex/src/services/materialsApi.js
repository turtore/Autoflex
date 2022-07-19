import axios from 'axios';

export default async function materialsAPI(caseInput, bodyValue) {
  switch (caseInput) {
  case 'REGISTER-MATERIAL': {
    try {
      const newMaterial= await axios({ method: 'post',
        url: 'http://localhost:8080/materials',
        data: bodyValue,
      });
      return newMaterial;
    } catch (error) {
      return console.log("error");;
    }
  }
  case 'GET-MATERIALS': {
    const materials = await axios({ method: 'get',
      url: 'http://localhost:8080/materials',
    });
    return materials;
  }
  case 'GET-MATERIAL-ID': {
    const materials = await axios({ method: 'get',
      url: `http://localhost:8080/materials/${bodyValue}`,
    });
    return materials;
  }
  case 'DELETE-MATERIAL': {
    const deleted = await axios({ method: 'delete',
    url: `http://localhost:8080/materials/${bodyValue}`,
  });
    return deleted;
  }
  
  default:
    return console.log('missing args');
  }
}
