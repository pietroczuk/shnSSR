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
                    path: '/',
                    // old_path: '/',
                    ...HomePage,
                    exact: true,
                    multilang: true,
                    // server_change: false,
                    type: 'homepage'
                },
                {
                    ...StaticPage,
                    path: '/about',
                    // old_path: '/about',
                    multilang: true,
                    // server_change: false,
                    type: 'static'
                },
                {
                    ...Product,
                    path: '/p/:url',
                    // old_path: '/about',
                    multilang: true,
                    // server_change: false,
                    // type: 'static'
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