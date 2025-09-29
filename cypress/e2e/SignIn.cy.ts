describe('Sign-in Page', () => {
  beforeEach(() => {
    cy.visit('/signin')
    cy.findByRole('button', { name: /^sign in$/i })
      .click()
      .as('signInButton')
  })

  it('shows a validation error when trying to sign in without entering an email', () => {
    cy.get('@signInButton').click()
    cy.findByText('Please enter a valid email address').should('exist')
  })

  it('shows a validation error when trying to sign in without entering a password', () => {
    cy.get('@signInButton').click()
    cy.findByText('Password must be at least 8 characters long').should('exist')
  })

  it('shows a validation error for invalid email format', () => {
    cy.findByLabelText(/email\*/i).type('test@invalid')
    cy.get('@signInButton').click()
    cy.findByText('Please enter a valid email address').should('exist')
  })

  it('navigates to the sign-up page when the sign-up link is clicked', () => {
    cy.findByText(/sign up/i).click()
    cy.assertUrl('/signup')
  })

  // it("redirects to the main home page on successful login and displays the user's name 'Maria' and the cart icon", () => {
  //   cy.login();
  //   cy.assertUrl("/explore");
  //   cy.contains("tester").should("be.visible");
  //   cy.contains("test@thinkstorm.app").should("be.visible");
  // });
})
