/* ---------------- Main server file ----------------- */

// import async await - babel-polyfil
import 'babel-polyfill';

import express from 'express';
import rednderHtml from './utils/rednderHtml';
import createServerInitStore from './utils/serverInitStore';
// routes
import { matchRoutes } from 'react-router-config';
import Routes from '../client/Routes';

const app = express();
// tell where is public files -> dir
app.use(express.static('public'));
app.get('*', (req, res) => {
    const server_store = createServerInitStore();

    const load_data_promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadDataOnInit ? route.loadDataOnInit(server_store) : null;
    }).map(promise => {
        // for fail promises, continue fetch data and resolve promises
        // double primise (outer)
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            })
        }
    });
    Promise.all(load_data_promises).then(() => {
        const server_context = {};
        const content = rednderHtml(req, server_store, server_context);
        if(server_context.url) {
            return res.redirect(301, server_context.url);
        }
        if (server_context.notFound) {
            res.status(404);
        }
        res.send(content);
    })
});
const port = 8080;
app.listen(port, () => {
    console.log('Listening on port ', port);
});