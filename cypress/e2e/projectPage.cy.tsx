describe('Projects Page', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })

  it('displays the page title', () => {
    cy.get('h1').should('contain', 'My Projects')
  })
  it('shows project filters', () => {
    const filters = ['Created', 'Saved', 'Joined', 'Reequested']
    filters.forEach((filter) => {
      cy.contains('button', filter).should('exist')
    })
  })
})
