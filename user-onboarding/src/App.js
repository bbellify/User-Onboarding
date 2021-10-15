import { React, useState, useEffect } from 'react'
import './App.css';
import Form from './Form'
import schema from './formSchema'
import * as yup from 'yup'
import styled from 'styled-components'

import axios from 'axios'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`

const AppDiv = styled.div`
  background-color: lightgray;
  margin: 2%;
  padding: 2%;
  width: 100%;
`

const UsersDiv = styled.div`
  width: 100%;
  overflow-wrap: break-all;
  background-color: lightgray;
  margin: 2% 0;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const User = styled.pre`
  overflow-wrap: break-all;
  text-align: center;
  font-family: inherit;
  margin: 0;
`

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  termsOfService: false,
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  termsOfService: '',
}



function App() {

  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true)

  const validate = (name,value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ''}))
      .catch((err) => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    }
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        // console.log(res.data);
        setUsers([res.data, ...users]);
        // console.log(users)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(setFormValues(initialFormValues))
  }

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => setDisabled(!valid))
  }, [formValues])
  

  return (
    <Wrapper>
      <AppDiv className="App">
        <Form 
          formValues={formValues}
          inputChange={inputChange}
          formSubmit={formSubmit}
          disabled={disabled}
          formErrors={formErrors}
        />
      </AppDiv>

      {users.length > 0 &&
        <UsersDiv className='users'>
          <h3 style={{ textAlign:'center' }}>Users</h3>
          {users.map(user => {
            return (
              <User>
                <p>Name: {user.first_name} {user.last_name}</p>
                <p>Email: {user.email}</p>
              </User>
            )
          })}
        </UsersDiv>
      }
    </Wrapper>
  );
}

export default App;
