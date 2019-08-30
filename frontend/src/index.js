
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './components/App'
import Hooks from './components/layouts/Hooks'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
                {/* <App /> */}
                <Hooks />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
