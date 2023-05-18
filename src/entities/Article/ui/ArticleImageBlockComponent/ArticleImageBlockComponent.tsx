import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';
import { ArtickleImageBlock } from '../../model/types/article';

import style from './articleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArtickleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(style.articleImageBlockComponent, {}, [
          className,
        ])}
      >
        <img className={style.img} src={block.src} alt={block.title} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    );
  }
);
