
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';

import { coreMdl } from './middleware/core';
import { appMdl } from './middleware/app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...appMdl, ...coreMdl))
);