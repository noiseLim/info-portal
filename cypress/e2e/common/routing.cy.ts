import { selectByTestId } from 'cypress/helpers/selectByTestId';

describe('Routing', () => {
  describe('The user is not logged in', () => {
    it('Go to the main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('Go to the profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('The transition opens a non-existent route', () => {
      cy.visit('/dadsda');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
  describe('The user is logged in', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    });
    it('Go to the profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });
    it('Go to the articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
