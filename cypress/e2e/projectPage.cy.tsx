describe('Projects Page', () => {
  beforeEach(() => {
    cy.visit('/projects');
  });

  it('displays the header and navigation elements', () => {
    cy.get('nav').should('exist');
    cy.get('img[alt="Header Background"]').should('be.visible');
  });
  it('shows project filters correctly', () => {
    const filters = ['Created', 'Saved', 'Joined', 'Reequested'];
    filters.forEach((filter) => {
      cy.contains('button', filter).should('exist');
    });
  });
  it('displays project cards with correct information', () => {
    cy.get('[data-testid="project-card"]').should('have.length.gt', 0);
    cy.get('[data-testid="project-card"]')
      .first()
      .within(() => {
        cy.get('h2').should('exist'); //Title
        cy.get('p').should('exist'); //Description
        cy.get('[data-testid="tech-label"]').should('exist'); //Tech stack
        cy.get('[data-testid="goal-badge"]').should('exist'); //Project goal
      });
  });

  it('handles project filtering', () => {
    cy.contains('button', 'Created').click();
    cy.get('[data-testid="project-card"]').should('exist');

    cy.contains('button', 'Saved').click();
    cy.get('[data-testid="project-card"]').should('exist');
  });

  it('implements infinite scroll', () => {
    // finish the test for scroll component later
  });
});
