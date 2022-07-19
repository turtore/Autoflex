import React, { useContext, useState } from 'react'
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap'
import Context from '../context/Context'
import NavbarComponent from '../components/NavbarComponent'
import materialsAPI from '../services/materialsApi'


const MaterialPage = () => {

  const { materials, refreshAll } = useContext(Context)
  
  const [inputsState, setInputsState] = useState({
    name: '',
    quantity: '',
  })

    
  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    })
  }

  const handleClick = async () => {
    const material = {
      name: inputsState.name,
      quantity: inputsState.quantity,
    }
    await materialsAPI('REGISTER-MATERIAL', material)
    refreshAll()
  }

  const handleDelete = async (id) => {
    await materialsAPI('DELETE-MATERIAL', id)
    refreshAll()
  }

  const handleUpdate = async () => {
    console.log('update');
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
                <th>Stock</th>
                <th>Update?</th>
                <th>Delete?</th>
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
                      onClick={handleUpdate}>
                      Update
                    </Button>
                  </td>
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

export default MaterialPage
