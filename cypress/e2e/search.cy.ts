describe('search products', () => {
  it('should be able to search for a products', () => {
    cy.visit('/');
    cy.get('form').type('moletom').submit();
    cy.location('pathname').should('include', '/search');
    cy.location('search').should('include', 'q=moletom');

    cy.get('a[href^="/product"]').should('exist');
  });
  it('should be able to visit search page without serach query', () => {
    cy.visit('/search');
    cy.location('pathname').should('equal', '/');
    // cy.location('search').should('include', 'q=moletom');

    // cy.get('a[href^="/product"]').should('exist');
  });
});
