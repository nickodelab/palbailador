
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';
import MyRoutes from './components/MyRoutes';
import { theme } from './styles/theme';
import * as serviceWorker from './serviceWorker';


const MyConfig = ({ children }) => {
    console.log('config...');
    return <>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </>;
}

ReactDOM.render(
    <MyConfig>
        <MyRoutes />
    </MyConfig>,
    document.getElementById('root')
);

serviceWorker.unregister();
