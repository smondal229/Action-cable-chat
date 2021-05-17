import { createMuiTheme } from '@material-ui/core';
import { grey, blueGrey, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: amber[800],
      contrastText: '#fff'
    },
  },
})

export default theme;