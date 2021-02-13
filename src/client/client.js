/* ---------------- Main client file ----------------- */

// import async await - babel-polyfil
import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import all_reducers from './redux/reducers/all_reducers';

// <Routes/> teraz są jako array []
// aby mozna bylo pobierac dane
// musimy inaczej zrenderowac
import { renderRoutes } from 'react-router-config';

const store_client = createStore(all_reducers, window.__INITIAL_STATE__ , applyMiddleware(thunk));

ReactDom.hydrate(
    <Provider store={store_client}>
        <BrowserRouter>
            {/* <Routes /> */}
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root')
);