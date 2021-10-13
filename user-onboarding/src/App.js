import { React, useState, useEffect } from 'react'
import './App.css';
import Form from './Form'
import schema from './formSchema'
import * as yup from 'yup'

import axios from 'axios'


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
        console.log(res.data)
        setUsers([res.data, ...users]);
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
    <div className="App">
      <div className='form'>
        <Form 
          formValues={formValues}
          inputChange={inputChange}
          formSubmit={formSubmit}
          disabled={disabled}
          formErrors={formErrors}
        />
      </div>
      <div className='users'>
          
      </div>
    </div>
  );
}

export default App;
