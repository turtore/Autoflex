import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap';
import Context from '../context/Context';
import NavbarComponent from '../components/NavbarComponent';
import materialsAPI from '../services/materialsApi';

const requestAllMaterials = async(setMaterials) => {
  const materials = await materialsAPI('GET-MATERIALS');
  setMaterials(materials.data);
  console.log(materials);
}

const MaterialPage = () => {

  const { setMaterials, materials } = useContext(Context)
  
  const [inputsState, setInputsState] = useState({
    name: '',
    quantity: '',
  });

  useEffect(() => {
    requestAllMaterials(setMaterials);
  }, [setMaterials])
    
  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
  };

  const handleClick = () => {
    const material = {
      name: inputsState.name,
      quantity: inputsState.quantity,
    };
    materialsAPI('REGISTER-MATERIAL', material)
  }

  const handleDelete = (id) => {
    materialsAPI('DELETE-MATERIAL', id)
  }
        
    
  return (
    <Container>
      <NavbarComponent />
        <Container>
          <FloatingLabel
          label='Register a new Material'/>
          <Form>
            <FloatingLabel
              label='Name'
            />
            <Form.Control
              type='text'
              onChange={handleChange}
              value={inputsState.name}
              name='name'
            />

            <FloatingLabel
              label='Quantity'
            />
            <Form.Control
              type='number'
              onChange={handleChange}
              value={inputsState.quantity}
              name='quantity'
            />
          </Form>
        
          <Button
            onClick={handleClick}
          >
            Register
          </Button>
        </Container>
        <br/>
        <Container>
          <FloatingLabel
            label='Registered Materials'
          />
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              { materials.map((material) => (
                <tr key={material.id}>
                  <td>{ material.id }</td>
                  <td>{ material.name }</td>
                  <td>{ material.quantity }</td>
                  <td>
                    <Button
                    type='button'
                    onClick={ () => handleDelete(`${material.id}`) }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>                
                )                
              )}
            </tbody>
            
          </table>

        </Container>
    </Container>
  )
}

export default MaterialPage;
