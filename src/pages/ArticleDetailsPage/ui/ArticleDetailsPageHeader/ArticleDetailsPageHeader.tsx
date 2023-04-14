import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getArticleDetailsData, getCanEditArticle } from 'entities/Article';
import { HStack } from 'shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}
export const ArticleDetailsPageHeader = memo(
  ({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation('article-details');

    const navigate = useNavigate();

    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.articles}/${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <HStack justify='between' max className={classNames('', {}, [className])}>
        <Button onClick={onBackToList}>{t('Back to the list')}</Button>
        {canEdit && <Button onClick={onEditArticle}>{t('Edit')}</Button>}
      </HStack>
    );
  }
);

export default ArticleDetailsPageHeader;
