import { ReactNode, useMemo, useState } from 'react';

import {
  LOCAL_STORAGE_THEM_KEY,
  Theme,
  ThemeContext,
} from '../lib/ThemeContext';

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
