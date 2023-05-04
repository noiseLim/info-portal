let profileId = '';

describe('The user enters the profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('and the profile loads successfully', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'Игнат');
  });
  it('and edits it', () => {
    const newFirstname = 'name';
    const newLastname = 'lastname';
    cy.updateProfile(newFirstname, newLastname);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
});
