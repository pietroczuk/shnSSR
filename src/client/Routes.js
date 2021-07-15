import RootApp from './pages/rootApp/RootApp';
import HomePage from './pages/HomePage/HomePage';

import NotFoundPage from './pages/404/NotFoundPage';
import StaticPage from './pages/StaticPage/StaticPage';
import Product from './pages/Product/Product';


// import loadable from '@loadable/component';

// const NotFoundPage = loadable(() => import('../client/pages/NotFoundPage')
// ,
//     {
//         ssr: true,
//         fallback: <span className="loading-state">ssr: true - Loading...</span>
//     });

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
                    ...Product,
                    path: '/:url',
                    multilang: true,
                    server_change: false,
                    type: 'product'
                },
                {
                    ...NotFoundPage
                    // component: {props => <About {...props} />}
                    // component: <NotFoundPage/>
                }

            ]
        }
    ];


// config:
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config