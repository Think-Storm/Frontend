/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      logout(): Chainable<void>
      assertUrl(url: string): Chainable<void>
      getProductCardByIndex(index: number): Chainable<JQuery<HTMLElement>>
      getCartButton(): Chainable<JQuery<HTMLElement>>
    }
  }
}

import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', () => {
  const username = 'suji@thinkstorm.app'
  const password = 'Asdf1234!'

  cy.visit('/signin')
  cy.findByLabelText(/email\*/i).type(username)
  cy.findByLabelText(/password\*/i).type(password)
  cy.findByRole('button', { name: /^sign in$/i }).as('signInButton')
  cy.get('@signInButton').click()
})

Cypress.Commands.add('assertUrl', (url) => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`)
})
