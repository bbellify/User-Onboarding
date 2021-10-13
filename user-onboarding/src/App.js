import { React, useState, useEffect } from 'react'
import './App.css';
import Form from './Form'

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

  const [teamMembers, setTeamMembers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  const inputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <div className="App">
      <Form 
        teamMembers={teamMembers}
        formValues={formValues}
        inputChange={inputChange}
      />
    </div>
  );
}

export default App;
