

describe('Add Account Form', () => {

    beforeEach(() => {
        cy.visit('localhost:3000');
    })

    // Getters
    const firstNameInput = () => cy.get('input[name=first_name]');

    describe('inputs working', () => {

        it('can enter text in first name', () => {
            firstNameInput()
            .should('have.value', '')
            .type('first name')
            .should('have.value', 'first name')
        })

    })


})