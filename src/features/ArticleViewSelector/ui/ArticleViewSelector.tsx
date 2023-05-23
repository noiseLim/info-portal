import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TileIconDeprecated from '@/shared/assets/icons/tile-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

import style from './articleViewSelector.module.scss';
import styleRedesigned from './articleViewSelectorRedesigned.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TileIcon,
      off: () => TileIconDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card
          className={classNames(styleRedesigned.articleViewSelector, {}, [
            className,
          ])}
          border='round'
        >
          <HStack gap='8'>
            {viewTypes.map((viewType) => (
              <Icon
                className={classNames(
                  '',
                  { [styleRedesigned.notSelected]: viewType.view !== view },
                  []
                )}
                Svg={viewType.icon}
                onClick={onClick(viewType.view)}
                clickable
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(style.articleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                className={classNames(
                  '',
                  { [style.notSelected]: viewType.view !== view },
                  []
                )}
                Svg={viewType.icon}
                width={24}
                height={24}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
