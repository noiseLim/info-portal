describe('The user enters a page with a list of articles', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });
  it('and the articles are loaded successfully', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
