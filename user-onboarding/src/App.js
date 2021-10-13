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

  const [accounts, setAccounts] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  // const [disabled, setDisabled] = useState(true)

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
    const newAccount = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    }
    setAccounts([newAccount, ...accounts])
  }

  

  return (
    <div className="App">
      <div className='form'>
        <Form 
          formValues={formValues}
          inputChange={inputChange}
          formSubmit={formSubmit}
        />
      </div>
      <div className='accounts'>
        {accounts.map(account =>
          <div className='account'>
            <p>Name: {account.first_name} {account.last_name} </p>
            <p> Email: {account.email}</p>
          </div>
          )}
      </div>
    </div>
  );
}

export default App;
