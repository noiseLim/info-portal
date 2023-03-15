import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy-22x22.svg';
import { Button, ButtonTheme } from '../Button/Button';

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
    <pre className={classNames(style.code, {}, [className])}>
      <Button
        className={style.copyBtn}
        onClick={onCopy}
        theme={ButtonTheme.CLEAR}
      >
        <CopyIcon className={style.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
