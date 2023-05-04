let currentArticleId = '';

describe('The user enters the article page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('and sees the content of the article', () => {
    cy.getByTestId('ArticleDetails.info').should('exist');
  });
  it('and sees a list of recommendations', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('and leaves a comment', () => {
    cy.getByTestId('ArticleDetails.info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('and puts an estimate', () => {
    cy.getByTestId('ArticleDetails.info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(4, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 4);
  });
});
