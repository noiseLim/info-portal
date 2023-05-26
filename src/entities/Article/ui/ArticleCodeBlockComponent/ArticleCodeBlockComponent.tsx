import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/redesigned/Code';

import { ArtickleCodeBlock } from '../../model/types/article';

import style from './articleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArtickleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(style.articleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    );
  }
);
