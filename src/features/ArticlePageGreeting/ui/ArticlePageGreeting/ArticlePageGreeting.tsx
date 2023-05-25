import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

interface ArticlePageGreetingProps {
  className?: string;
}

export const ArticlePageGreeting = memo((props: ArticlePageGreetingProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('Welcome to the articles page')}
      text={t('Here you can search and view articles on various topics')}
    />
  );

  if (isMobile) {
    return (
      <Drawer className={className} isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal className={className} lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
