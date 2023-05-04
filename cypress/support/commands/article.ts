import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'TESTING ARTICLE',
  subtitle: 'Биология все любят!',
  img: 'https://kipmu.ru/wp-content/uploads/2021/01/blgtrv.jpg',
  views: 13901,
  createdAt: '02.02.2023',
  userId: '2',
  type: ['SCIENCE'],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/articles',
      headers: { Authorization: 'qwerty' },
      body: article ?? defaultArticle,
    })
    .then((res) => res.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'qwerty' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
