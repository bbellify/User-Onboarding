

describe('Add Account Form', () => {

    beforeEach(() => {
        cy.visit('localhost:3000');
    })

    // Getters
    const firstNameInput = () => cy.get('input[name=first_name]');
    const lastNameInput = () => cy.get('input[name=last_name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput= () => cy.get('input[name=password]');
    const termsBox = () => cy.get('input[name=termsOfService]');
    const submitButton = () => cy.contains('Submit');
    const errorsDiv = () => cy.get('.errors')


    describe('inputs working', () => {

        it('can enter text in first name', () => {
            firstNameInput()
                .should('have.value', '')
                .type('first name')
                .should('have.value', 'first name')
        })

        it('can enter text in email input', () => {
            emailInput()
                .should('have.value', '')
                .type('email@aol.com')
                .should('have.value', 'email@aol.com')
        })

        it('can enter text in password input', () => {
            passwordInput()
                .should('have.value', '')
                .type('testpassword')
                .should('have.value', 'testpassword')
        })
    })

    describe('checkbox test', () => {
        it('can check the terms box', () => {
            termsBox()
                .check()
                .uncheck()
        })
    })

    describe('testing form submission/validity', () => {
        it('can submit form with valid form entry', () => {
            firstNameInput().type('Name');
            lastNameInput().type('LastName');
            emailInput().type('hey@aol.com');
            passwordInput().type('password');
            termsBox().check();
            submitButton().click();

        })
        // would do each of these for each field if setting up real testing
        it('error shows up if field left blank', () => {
            firstNameInput().type('n');
            firstNameInput().type('{backspace}')
            lastNameInput().type('LastName');
            emailInput().type('hey@aol.com');
            passwordInput().type('password');
            termsBox().check();
            errorsDiv()
                .should('be.visible')

        })
    })
})