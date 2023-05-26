import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

import { ArtickleImageBlock } from '../../model/types/article';

import style from './articleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArtickleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(style.articleImageBlockComponent, {}, [
          className,
        ])}
      >
        <img className={style.img} src={block.src} alt={block.title} />
        {block.title && (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<Text text={block.title} align='center' />}
            off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
          />
        )}
      </div>
    );
  }
);
