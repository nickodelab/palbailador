
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routing from '../utils/routing';
import { theme } from '../styles/theme';
import Core from './Core';

if (process.env.NODE_ENV === 'development') console.log('@material-ui/theme', theme);

const MyRoutes = () => {
    console.log('<MyRoutes />...');
    return <>
        <Switch>
            {routing.getRoutes().map(({ path, name, Component, Layout, exact, isPublic }) =>
                <Route
                    path={path}
                    exact={exact}
                    render={() => <Core
                        Component={Component}
                        Layout={Layout}
                        routeName={name}
                    />}
                    key={name}
                />
            )}
        </Switch>
    </>;
}

export default MyRoutes;
