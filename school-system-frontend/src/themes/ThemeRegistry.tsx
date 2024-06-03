import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5e32fc',
      dark: '#512bd9',
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&:hover': {
            backgroundColor: '#512bd9',
          },
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}