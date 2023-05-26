import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

import { ArtickleTextBlock } from '../../model/types/article';

import style from './articleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArtickleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(style.articleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<Text className={style.title} title={block.title} />}
            off={<TextDeprecated className={style.title} title={block.title} />}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <Text
                className={style.paragraph}
                key={paragraph}
                text={paragraph}
              />
            }
            off={
              <TextDeprecated
                className={style.paragraph}
                key={paragraph}
                text={paragraph}
              />
            }
          />
        ))}
      </div>
    );
  }
);
