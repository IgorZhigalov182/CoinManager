import { useLayoutEffect, useState } from 'react';
import localStorageService from '../services/localStorage.services';

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = isDarkTheme ? 'dark' : 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorageService.getTheme() || defaultTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorageService.setTheme(theme);
  }, [theme]);

  return { theme, setTheme };
};
