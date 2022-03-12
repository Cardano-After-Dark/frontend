import {
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#01127d',
      dark: '#070f41',
      light: '#1f34b9',
    },
    secondary: {
      main: '#2d6abf',
    },
    error: {
      main: '#b71c1c',
    },
    success: {
      main: '#1b5e20',
    },
    warning: {
      main: '#f57c00',
    },
  },
};

const customTheme: Theme = createTheme(themeOptions);
export const theme = responsiveFontSizes(customTheme);
