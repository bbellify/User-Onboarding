

describe('Add Account Form', () => {

    beforeEach(() => {
        cy.visit('localhost:3000');
    })

    // Getters
    const firstNameInput = () => cy.get('input[name=first_name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput= () => cy.get('input[name=password]');


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


})