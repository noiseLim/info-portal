import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from 'widgets/Page/Page';

const ArticleEditPage = memo((props) => {
  const { t } = useTranslation('article-details');

  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);

  return (
    <Page>
      {isEdit
        ? t('Editing an article with an ID') + id
        : t('Creating a new article')}
    </Page>
  );
});

export default ArticleEditPage;
