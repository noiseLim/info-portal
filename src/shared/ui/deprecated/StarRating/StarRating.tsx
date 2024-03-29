import { memo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star-20-20.svg';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

import { Icon as IconDeprecated } from '../Icon/Icon';
import { Icon } from '../../redesigned/Icon';

import style from './starRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, size = 30, selectedStars = 0 } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => style.starRatingRedesigned,
          off: () => style.starRating,
        }),
        {},
        [className]
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(
            style.starIcon,
            { [style.selected]: isSelected },
            [currentStarsCount >= starNumber ? style.hovered : style.normal]
          ),
          Svg: StarIcon,
          key: starNumber,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': currentStarsCount >= starNumber,
        };

        return (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<Icon clickable={!isSelected} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
          />
        );
      })}
    </div>
  );
});
