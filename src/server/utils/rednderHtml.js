import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../../client/Routes';
import { Provider } from 'react-redux';
// <Routes/> teraz są jako array []
// aby mozna bylo pobierac dane
// musimy inaczej zrenderowac
import { renderRoutes } from 'react-router-config';

import serialize from 'serialize-javascript';

// SEO
import { Helmet } from 'react-helmet';

export default (req, server_store, context) => {
    const content = renderToString(
        <Provider store={server_store}>
            <StaticRouter location={req.path} context={context}>
                {/* <Routes /> */}
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );
    
    const server_helmet = Helmet.renderStatic();
    const html = `
        <html>
            <head>
            ${server_helmet.title.toString()}
            ${server_helmet.meta.toString()}
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                  window.__INITIAL_STATE__ = ${serialize(server_store.getState())};
                </script>
            </body>
            <script src="bundle.js"></script>
        </html>
    `;
    return html;
}