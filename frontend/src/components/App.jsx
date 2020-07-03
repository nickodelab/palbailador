
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core/'
import { connect } from 'react-redux'

import routing from '../utils/routing'
import { theme } from '../styles/theme'

console.log('@material-ui/theme', theme)

const App = ({ isUserLoggedIn }) => <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
            {routing.getRoutes().map(({ path, exact, Component, Layout }, key) =>
                <Route
                    path={path}
                    exact={exact}
                    render={() => <Layout Component={Component} />}
                    key={key}
                />
            )}
        </Switch>
    </ThemeProvider>
</>

const mapStateToProps = ({ loggedInUser: { token } }) => ({ isUserLoggedIn: !!token })
export default connect(mapStateToProps)(App)
