import { loadDataOnInit } from './utils/loadDataOnInit';
import { pageTypes } from './utils/utilsFrondend';

import loadable from '@loadable/component';
import Cart from './pages/Cart/Cart';

const RootApp = loadable(() => import(/* webpackPrefetch: true */ './pages/rootApp/RootApp'), {});
const HomePage = loadable(() => import(/* webpackPrefetch: true */ './pages/HomePage/HomePage'), {});
const StaticPage = loadable(() => import(/* webpackPrefetch: true */ './pages/StaticPage/StaticPage'), {});
const Product = loadable(() => import(/* webpackPrefetch: true */ './pages/Product/Product'), {});
const Category = loadable(() => import(/* webpackPrefetch: true */ './pages/Category/Category'), {});
const Wishlist = loadable(() => import(/* webpackPrefetch: true */ './pages/Wishlist/Wishlist'), {});
const NotFoundPage = loadable(() => import(/* webpackPrefetch: true */ './pages/404/NotFoundPage'), {});

// zamiast klasycznego <router> 
// do SSR, aby mozna bylo pobierac dane przez serwer

export const getRoutes = () => {
    return (
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
                        server_change: false,
                        type: pageTypes.homePage
                    },
                    {
                        component: StaticPage,
                        loadDataOnInit: loadDataOnInit,
                        path: '/:url',
                        server_change: false,
                        type: pageTypes.staticPage
                    },
                    {
                        component: Product,
                        loadDataOnInit: loadDataOnInit,
                        path: '/:url',
                        server_change: false,
                        type: pageTypes.productPage
                    },
                    {
                        component: Category,
                        loadDataOnInit: loadDataOnInit,
                        path: '/:url',
                        server_change: false,
                        type: pageTypes.categoryPage
                    },
                    {
                        component: Wishlist,
                        path: '/',
                        exact: true,
                        server_change: false,
                        type: pageTypes.wishlist
                    },
                    {
                        component: Cart,
                        path: '/',
                        exact: true,
                        server_change: false,
                        type: pageTypes.cart
                    },
                    {
                        component: NotFoundPage
                    }

                ]
            }
        ]
    );
}
export default getRoutes;

// config:
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config