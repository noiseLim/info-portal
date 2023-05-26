import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0,
  } = props;

  const { t } = useTranslation();

  const [isModalOpen, setIsOpenModal] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsOpenModal(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const onAcceptHandle = useCallback(() => {
    onAccept?.(starsCount, feedback);
    setIsOpenModal(false);
  }, [feedback, onAccept, starsCount]);

  const onCancelHandle = useCallback(() => {
    onCancel?.(starsCount);
    setIsOpenModal(false);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            placeholder={t('Your feedback')}
            value={feedback}
            onChange={setFeedback}
            data-testid='RatingCard.Input'
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            placeholder={t('Your feedback')}
            value={feedback}
            onChange={setFeedback}
            data-testid='RatingCard.Input'
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align='center' gap='8'>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={starsCount ? t('Thanks for the rating') : title} />}
          off={
            <TextDeprecated
              title={starsCount ? t('Thanks for the rating') : title}
            />
          }
        />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap='8'>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={
                <HStack max gap='16' justify='end'>
                  <Button
                    onClick={onCancelHandle}
                    data-testid='RatingCard.Close'
                  >
                    {t('Close')}
                  </Button>
                  <Button
                    onClick={onAcceptHandle}
                    data-testid='RatingCard.Send'
                  >
                    {t('Send')}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap='16' justify='end'>
                  <ButtonDeprecated
                    onClick={onCancelHandle}
                    theme={ButtonTheme.OUTLINE_RED}
                    data-testid='RatingCard.Close'
                  >
                    {t('Close')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    onClick={onAcceptHandle}
                    data-testid='RatingCard.Send'
                  >
                    {t('Send')}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={onCancelHandle}>
          <VStack gap='32'>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={
                <Button onClick={onCancelHandle} size='l' fullWidth>
                  {t('Send')}
                </Button>
              }
              off={
                <ButtonDeprecated
                  onClick={onCancelHandle}
                  size={ButtonSize.L}
                  fullWidth
                >
                  {t('Send')}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card
          className={className}
          max
          border='partial'
          padding='24'
          data-testid='RatingCard'
        >
          {content}
        </Card>
      }
      off={
        <CardDeprecated className={className} max data-testid='RatingCard'>
          {content}
        </CardDeprecated>
      }
    />
  );
});
