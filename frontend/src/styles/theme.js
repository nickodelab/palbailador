
import { createMuiTheme } from '@material-ui/core/styles'

const RalewayUrl = 'https://fonts.googleapis.com/css?family=Raleway:300,400,500,700&display=swap'

const raleway = {
  fontFamily: 'Raleway, Roboto, sans-serif',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,  
  src: `url(${RalewayUrl})`
}

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4ebaaa',
            main: '#00897b',
            dark: '#005b4f',
        }
    },
    typography: {
        fontFamily: [
          'Raleway',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [raleway],
          },
        },
      }
})
