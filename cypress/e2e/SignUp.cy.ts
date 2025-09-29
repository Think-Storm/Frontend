describe('Sign-up Page', () => {
  beforeEach(() => {
    cy.visit('/signup')
    cy.findByRole('button', { name: /^sign up$/i })
      .click()
      .as('signUpButton')
  })

  it('shows a validation error when trying to sign up without entering a username', () => {
    cy.get('@signUpButton').click()
    cy.findByText('Username must be at least 4 characters long').should('exist')
  })

  it('shows a validation error when trying to sign up without entering an email', () => {
    cy.get('@signUpButton').click()
    cy.findByText('Please enter a valid email address').should('exist')
  })

  it('shows a validation error when trying to sign up without entering a password', () => {
    cy.get('@signUpButton').click()
    cy.findByText('Password must be at least 8 characters long').should('exist')
  })

  it('shows a validation error for invalid email format', () => {
    cy.findByLabelText(/email\*/i).type('test@invalid')
    cy.get('@signUpButton').click()
    cy.findByText('Please enter a valid email address').should('exist')
  })

  it('navigates to the sign-in page when the sign-in link is clicked', () => {
    cy.findByText(/sign in/i).click()
    cy.assertUrl('/signin')
  })

  it('successfully signs up and redirects to the sign-in page', () => {
    cy.intercept('POST', 'http://localhost:3000/register', { statusCode: 200 })

    const randomId = Date.now()
    cy.findByLabelText(/username\*/i).type(`Suji${randomId}`.substring(0, 15))
    cy.findByLabelText(/email\*/i).type(`suji${randomId}@thinkstorm.app`)
    cy.findByLabelText(/password\*/i).type('Asdf1234!')

    cy.get('@signUpButton').click()
    cy.findByText('Sign-up Successful').should('exist')
    cy.assertUrl('/signin')
  })

  it('fails to sign up and shows an error message', () => {
    cy.intercept('POST', 'http://localhost:3000/register', { statusCode: 401 })

    cy.findByLabelText(/username\*/i).type('Tester')
    cy.findByLabelText(/email\*/i).type('tester@thinkstorm.app')
    cy.findByLabelText(/password\*/i).type('Asdf1234!!!')

    cy.get('@signUpButton').click()
    cy.findByText('Sign-up Failed').should('exist')
  })
})
