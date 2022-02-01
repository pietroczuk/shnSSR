/* ---------------- Main client file ----------------- */

// import async await - babel-polyfil
// import 'babel-polyfill';

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { prepareRoutesConfig } from './utils/config';

import { configureStore } from '@reduxjs/toolkit';

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
// import all_reducers from './redux/reducers/all_reducers';

import { loadableReady } from '@loadable/component';

// import { composeWithDevTools } from 'redux-devtools-extension';


import allReducers from './redux/slices/allReducers';
// if ('serviceWorker' in navigator && false) {
//     navigator.serviceWorker
//         .register('/sw.js')
//         .then(function () {
//             console.log('Service worker registered!');
//         });
// }

// <Routes/> teraz są jako array []
// aby mozna bylo pobierac dane
// musimy inaczej zrenderowac
import { renderRoutes } from 'react-router-config';

import StyleContext from 'isomorphic-style-loader/StyleContext';

// const store_client = createStore(all_reducers, window.__INITIAL_STATE__, composeWithDevTools(applyMiddleware(thunk)));

const store_client = configureStore({
    reducer: allReducers,
    preloadedState: (window as any).__INITIAL_STATE__,
    // devTools: false, //process.env.NODE_ENV !== 'production',
});



export type RootState = ReturnType<typeof store_client.getState>
export type ClientAppDispatch = typeof store_client.dispatch;
export const useClientAppDispatch = () => useDispatch<ClientAppDispatch>();

const new_routes_config = (window as any).__CONFIG__;
const initialState = store_client.getState();
const userLanguage = initialState.User.language;
const multilanguage = initialState.SystemConfig.multilanguage;

delete (window as any).__INITIAL_STATE__;
delete (window as any).__CONFIG__;

const insertCss = (...styles:any[]) => {
// const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () =>removeCss.forEach(dispose => dispose());
};

// const css = new Set();
// const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

// const css = new Set();
// const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
// const insertCss = null;
// console.log('client multilanguage:', multilanguage);
loadableReady(() => {
    hydrate( 
        <Provider store={store_client}>
            <StyleContext.Provider value={{ insertCss }}>
                <BrowserRouter>
                    <React.Fragment>
                        {renderRoutes(prepareRoutesConfig(new_routes_config, userLanguage, multilanguage))}
                    </React.Fragment>
                </BrowserRouter>
            </StyleContext.Provider>
        </Provider>
        , document.getElementById('root')
    );
});