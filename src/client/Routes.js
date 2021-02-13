import RootApp from '../client/components/rootApp/RootApp';
import HomePage from '../client/pages/HomePage';
import NotFoundPage from '../client/pages/NotFoundPage';
// zamiast klasycznego <router> 
// do SSR, aby mozna bylo pobierac dane przez serwer

export default [
    {
        ...RootApp,
        routes: [
            {
                path: '/', 
                ...HomePage,
                exact: true
            },
            {
                ...NotFoundPage
            }
        ]
    }
];


// config:
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config