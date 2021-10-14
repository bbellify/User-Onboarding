import { React } from 'react'
import styled from 'styled-components'

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    align-items: space-evenly;
`
const Input = styled.input`
    margin-left: 1%;
`

const Errors = styled.div`
    padding: 0;
    margin: 0;
`
const Error = styled.div`
    color: red;
    font-weight: bold;

`

const Button = styled.button`
    margin-top: 2%;
`

export default function Form(props) {
    const { 
        formValues,
        inputChange,
        formSubmit,
        disabled,
        formErrors

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
        <form onSubmit={onSubmit}>
            <h2>Add an Account</h2>
            <Inputs>
                <h3>Information</h3>
                <label>First Name: 
                <Input
                    value={formValues.first_name}
                    onChange={onChange}
                    name='first_name'
                    type='text'
                />
                </label>
                <label>Last Name: 
                <Input
                    value={formValues.last_name}
                    onChange={onChange}
                    name='last_name'
                    type='text'
                />
                </label>
                <label>Email:
                    <Input
                        value={formValues.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>Password:
                    <Input
                        value={formValues.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
            </Inputs>
            <div className='termsOfService'>
                <h4>Terms of Service</h4>
                    <label>I've read and agreed to the terms:
                        <Input
                            type='checkbox'
                            name='termsOfService'
                            onChange={onChange}
                            checked={formValues.termsOfService === true }
                        />
                    </label>
            </div>
            <div className='formSubmit'>
                <Errors>
                    <Error>{formErrors.first_name}</Error>
                    <Error>{formErrors.last_name}</Error>
                    <Error>{formErrors.email}</Error>
                    <Error>{formErrors.password}</Error>
                    <Error>{formErrors.termsOfService}</Error>
                </Errors>
                <Button disabled={disabled}>Submit</Button>
            </div>
        </form>
    )

    

}

