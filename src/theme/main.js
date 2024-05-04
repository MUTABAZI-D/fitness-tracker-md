import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // THE DARK/WHITE COLOR
    primary: {
      light: '#fff', // WHITE
      main: '#525f7f', // MAIN DARK COLOR (FOR TEXT)
      contrastText: '#32325d', // DARK COLOR (FOR HEADING TEXTS)
      dark: '#212229', // DARK COLOR (FOR SIDEBAR BACKGROUND)
    },
    // THE GRAY COLOR
    secondary: {
      main: '#8898aa',
    },
    // THE BACKGROUND COLOR (FOR BODY)
    background: {
      default: '#f8f9fe',
    },
    // THE ORANGE COLOR
    warning: {
      main: '#ffd600',
    },
    // THE BLUE COLOR
    info: {
      main: '#11cdef',
    },
    // THE RED COLOR
    error: {
      main: '#f5365c',
    },
    // THE GREEN COLOR
    success: {
      main: '#2dce89',
    },
    // THE BORDER COLOR
    divider: 'rgba(0, 0, 0, 0.1)',
  },
});

export default theme;
