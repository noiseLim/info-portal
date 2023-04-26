import { ReactNode, useMemo, useState } from 'react';

import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEM_KEY } from '@/shared/const/localstorage';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props;
  const defautTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEM_KEY) as Theme) || Theme.LIGHT;

  const [theme, setTheme] = useState<Theme>(initialTheme || defautTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
