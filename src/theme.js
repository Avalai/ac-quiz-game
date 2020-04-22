import { createMuiTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    success: {
      main: green[500]
    },
    error: {
      main: red[500]
    },
    background: {
      default: green[300]
    }
  },
  overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundImage:
              // "url(/ac_seamless_pattern.png)"
              "url(/nh-pattern-leaves-light.jpg)"
          }
        }
      }
    }
});

theme.typography.h1 = {
  fontSize: '2.4rem',
  '@media (min-width:320px)': {
    fontSize: '1.8rem',
  },
};
theme.typography.button = {
  fontSize: '1.2rem',
  // '@media (max-width:320px)': {
  //   fontSize: '1.5rem',
  // },
};

export default theme;