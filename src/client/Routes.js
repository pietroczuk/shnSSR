// import React from 'react';

import RootApp from './pages/rootApp/RootApp';
import HomePage from './pages/HomePage/HomePage';

// import NotFoundPage from './pages/404/NotFoundPage';
import StaticPage from './pages/StaticPage/StaticPage';
// import Product from './pages/Product/Product';
import { loadDataOnInit } from './utils/loadDataOnInit';
import Category from './pages/Category/Category';


import loadable from '@loadable/component';

const NotFoundPage = loadable(() => import(/* webpackPrefetch: true */ './pages/404/NotFoundPage'), {});
const Product = loadable(() => import(/* webpackPrefetch: true */ './pages/Product/Product'), {});

// zamiast klasycznego <router> 
// do SSR, aby mozna bylo pobierac dane przez serwer

export default
    [
        {
            ...RootApp,
            routes: [
                {
                    ...HomePage,
                    path: '/',
                    exact: true,
                    multilang: true,
                    server_change: false,
                    type: 'homepage'
                },
                {
                    ...StaticPage,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: 'staticpage'
                },
                {
                    // ...Product,
                    component: Product,
                    loadDataOnInit: loadDataOnInit,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: 'product'
                },
                {
                    ...Category,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: 'category'
                },
                {
                    // ...NotFoundPage.component
                    // component: {props => <About {...props} />}
                    // component: NotFoundPage
                    component: NotFoundPage
                    // render: NotFoundPage.render
                }

            ]
        }
    ];
    // console.log(NotFoundPage.component);


// config:
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config