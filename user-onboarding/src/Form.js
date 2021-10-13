import { React } from 'react'
import axios from 'axios'


export default function Form(props) {
    const { 
        formValues,
        inputChange,
        formSubmit

     } = props

     const onSubmit = evt => {
        evt.preventDefault()
        formSubmit()
      }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        inputChange(name, valueToUse)
    }

    return (
        <form className='formContainer' onSubmit={onSubmit}>
            <h2>Add an Account</h2>
            <div className='formInputs'>
                <h3>Information</h3>
                <label>First Name
                <input
                    value={formValues.first_name}
                    onChange={onChange}
                    name='first_name'
                    type='text'
                />
                </label>
                <label>Last Name
                <input
                    value={formValues.last_name}
                    onChange={onChange}
                    name='last_name'
                    type='text'
                />
                </label>
                <label>Email
                    <input
                        value={formValues.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>Password
                    <input
                        value={formValues.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
            </div>
            <div className='termsOfService'>
                <h4>Terms of Service</h4>
                    <label>I've read and agreed to the terms:
                        <input
                            type='checkbox'
                            name='termsOfService'
                            onChange={onChange}
                            checked={formValues.termsOfService === true }
                        />
                    </label>
            </div>
            <div className='formSubmit'>
                <div className='formErrors'>
                    <div>replace this with divs for errors</div>
                </div>
                <button>Submit</button>
            </div>
        </form>
    )

    

}

