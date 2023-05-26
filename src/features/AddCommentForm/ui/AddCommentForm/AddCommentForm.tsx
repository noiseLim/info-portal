import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

import { getAddCommentFormError } from '../../model/selectors/getAddCommentFormError/getAddCommentFormError';
import { getAddCommentFormText } from '../../model/selectors/getAddCommentFormText/getAddCommentFormText';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import style from './addCommentForm.module.scss';
import styleRedesigned from './addCommentFormRedesigned.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;

  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card padding='24' border='partial' max>
            <HStack
              justify='between'
              max
              gap='16'
              className={classNames(styleRedesigned.addCommentForm, {}, [
                className,
              ])}
              data-testid='AddCommentForm'
            >
              <Input
                className={style.input}
                placeholder={t('Enter the comment text')}
                value={text}
                onChange={onCommentTextChange}
                data-testid='AddCommentForm.Input'
              />
              <Button
                onClick={onSendHandler}
                data-testid='AddCommentForm.Button'
              >
                {t('Send')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            justify='between'
            max
            className={classNames(style.addCommentForm, {}, [className])}
            data-testid='AddCommentForm'
          >
            <InputDeprecated
              className={style.input}
              placeholder={t('Enter the comment text')}
              value={text}
              onChange={onCommentTextChange}
              data-testid='AddCommentForm.Input'
            />
            <ButtonDeprecated
              onClick={onSendHandler}
              data-testid='AddCommentForm.Button'
            >
              {t('Send')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
