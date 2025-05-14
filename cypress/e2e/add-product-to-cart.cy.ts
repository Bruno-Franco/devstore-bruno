describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should be able to visit the product page and aad it to cart', () => {
    cy.get('a[href^="/product"]').first().click();

    cy.url().should('include', '/product');
    cy.contains('Adicionar ao carrinho').click();

    cy.contains('Cart 1').should('exist');
  });

  it('should not be able to add twice', () => {
    cy.get('a[href^="/product"]').first().click();

    cy.url().should('include', '/product');
    cy.contains('Adicionar ao carrinho').click();
    cy.contains('Adicionar ao carrinho').click();

    cy.contains('Cart 1').should('exist');
  });

  it('should be able to search for a product and add to the cart', () => {
    cy.get('form').type('moletom').submit();
    cy.get('a[href^="/product"]').first().click();
    cy.contains('Adicionar ao carrinho').click();

    cy.contains('Cart 1').should('exist');
  });
});
