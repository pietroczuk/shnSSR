import { loadDataOnInit } from './utils/loadDataOnInit';
import { pageTypes } from './utils/utilsFrondend';

import loadable from '@loadable/component';

const RootApp = loadable(() => import(/* webpackPrefetch: true */ './pages/rootApp/RootApp'), {});
const HomePage = loadable(() => import(/* webpackPrefetch: true */ './pages/HomePage/HomePage'), {});
const StaticPage = loadable(() => import(/* webpackPrefetch: true */ './pages/StaticPage/StaticPage'), {});
const Product = loadable(() => import(/* webpackPrefetch: true */ './pages/Product/Product'), {});
const Category = loadable(() => import(/* webpackPrefetch: true */ './pages/Category/Category'), {});
const NotFoundPage = loadable(() => import(/* webpackPrefetch: true */ './pages/404/NotFoundPage'), {});

// zamiast klasycznego <router> 
// do SSR, aby mozna bylo pobierac dane przez serwer

export default
    [
        {
            component: RootApp,
            loadDataOnInit: loadDataOnInit,
            type: null,
            routes: [
                {
                    component: HomePage,
                    path: '/',
                    exact: true,
                    multilang: true,
                    server_change: false,
                    type: pageTypes.homePage
                },
                {
                    component: StaticPage,
                    loadDataOnInit: loadDataOnInit,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: pageTypes.staticPage
                },
                {
                    component: Product,
                    loadDataOnInit: loadDataOnInit,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: pageTypes.productPage
                },
                {
                    component: Category,
                    loadDataOnInit: loadDataOnInit,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: pageTypes.categoryPage
                },
                {
                    component: NotFoundPage
                }

            ]
        }
    ];


// config:
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config