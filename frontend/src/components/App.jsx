import React from 'react' 
import { Route, Switch } from 'react-router-dom'

import routing from '../utils/routing' 

import { ThemeProvider } from '@material-ui/styles'

import { Container, CssBaseline } from '@material-ui/core/'

import { theme } from '../styles/theme'

console.log('@material-ui/theme', theme)
 
const App = ({ classes }) => <> 
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
        <Switch>
            {routing.getRoutes().map(({ path, Component, exact }, key) => 
                <Route
                    key={key}
                    exact={exact}
                    component={Component}
                    path={path}
                />
            )} 
        </Switch> 
    </Container>
    </ThemeProvider>
</>
 
export default App
