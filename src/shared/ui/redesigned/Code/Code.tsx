import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-22x22.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { ToggleFeatures } from '@/shared/lib/features';

import { Icon } from '../Icon';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';

import style from './code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <pre className={classNames(style.codeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={style.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(style.code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={style.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={style.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
    />
  );
});
