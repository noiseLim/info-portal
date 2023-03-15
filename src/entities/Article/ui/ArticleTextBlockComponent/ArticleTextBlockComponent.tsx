import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArtickleTextBlock } from '../../model/types/article';

import style from './articleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArtickleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(style.articleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text className={style.title} title={block.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text className={style.paragraph} key={paragraph} text={paragraph} />
        ))}
      </div>
    );
  }
);
