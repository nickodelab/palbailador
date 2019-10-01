
import React from 'react' 
import { Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core/'
import { connect } from 'react-redux'

import routing from '../utils/routing' 
import { theme } from '../styles/theme'
import MainLayout from './layouts/MainLayout'

console.log('@material-ui/theme', theme)

const App = ({ isUserLoggedIn }) => {

    return <>

        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Switch>
                    {routing.getRoutes().map(({ url, exact, Component, Layout }, key) => 
                        <Route
                            path={url}              
                            exact={exact}
                            component={Layout ? Layout(Component) : MainLayout(Component)}
                            key={key}
                        />
                    )} 
                </Switch> 
        </ThemeProvider>

    </>
}
 
const mapStateToProps = ({ loggedInUser: { token }}) => ({ isUserLoggedIn: !!token })
export default connect(mapStateToProps)(App)
