import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card/Card';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Input } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

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
    <>
      <Text title={feedbackTitle} />
      <Input
        placeholder={t('Your feedback')}
        value={feedback}
        onChange={setFeedback}
      />
    </>
  );

  return (
    <Card className={className} max>
      <VStack align='center' gap='8'>
        <Text title={starsCount ? t('Thanks for the rating') : title} />
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
            <HStack max gap='16' justify='end'>
              <Button onClick={onCancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                {t('Close')}
              </Button>
              <Button onClick={onAcceptHandle}>{t('Send')}</Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={onCancelHandle}>
          <VStack gap='32'>
            {modalContent}
            <Button onClick={onCancelHandle} size={ButtonSize.L} fullWidth>
              {t('Send')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});
