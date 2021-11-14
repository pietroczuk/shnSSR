/* ---------------- Main server file ----------------- */

// import async await - babel-polyfil
import 'babel-polyfill';

import express from 'express';
import compression from 'compression';
import rednderHtml from './utils/rednderHtml';
import createServerInitStore from './utils/serverInitStore';
// routes
import { matchRoutes } from 'react-router-config';

import axios from 'axios';
// Zamiast routes prepare_routes_config - modyfikujemy dynamicznie z api
import { prepare_routes_config } from '../client/utils/config';

// user language init
import {
    check_user_language,
    language_from_path,
    get_currency_cookie,
    get_display_cookies,
    get_reques_slug
} from './utils/utilsBackend';

/** CACHE */
// const cache = require('node-file-cache').create();


const app = express();
app.disable('x-powered-by');
// tell where is public files -> dir
app.use(compression());
app.use(express.static('public_html/public', { maxAge: '1y' }));

const dotenv = require('dotenv').config({ path: 'public_html/server/.env' });

if (!process.env.API_URL) {
    console.error('❌ Error load env file!')
} else {
    console.log('🗂  Local env config file load Success!');
}
const api =
{
    'url': process.env.API_URL,
    'config': process.env.API_CONFIG_URL,
}
const apiUrl = api.url;

// const new_Routes = [...Routes];

app.get('*', (req, res) => {
    // const cachedItem = cache.get(req.path);
    // if(cachedItem) {
    //     res.send(cachedItem.content);
    //     console.log('from cache');
    // }else{

    axios.get(apiUrl + api.config)
        .then(apires => {
            // const api_config = apires.data.config.language
            console.log('🌎 Web Api config load Success!');
            // return api_config;
            return apires.data;
        })
        .catch(err => {
            console.error('❌ Error get config file', err);
        }).then(api_config => {
            const multilanguage = api_config.multilanguage;
            const blankUrl = req.path === '/' ? true : false;
            const languages = api_config.language;
            const languageFromUrl = language_from_path(req.path, languages);
            const user_language =
                multilanguage ?
                    blankUrl ?
                        check_user_language(req.headers.cookie, req.headers['accept-language'], languages, api_config.cookies_keys['user_language'])
                        :
                        languageFromUrl
                    :
                    Object.values(languages)[0]['code'];

            if (blankUrl) {
                const homepageUrl = api_config.special_pages_urls &&
                    api_config.special_pages_urls.homepage &&
                    api_config.special_pages_urls.homepage[user_language] ?
                    multilanguage ?
                        user_language + '/' + api_config.special_pages_urls.homepage[user_language]
                        : api_config.special_pages_urls.homepage[user_language]
                    : user_language;
                res.redirect('/' + homepageUrl);
            } else {
                // const css = new Set(); // CSS for all rendered React components
                // const insertCss = (...styles) =>
                //     styles.forEach((style) => css.add(style._getCss()));
                const user_currency = get_currency_cookie(req.headers.cookie, api_config.currency, api_config.cookies_keys['user_currency']);

                // get display cookies
                const display_options = get_display_cookies(req.headers.cookie, api_config.cookies_keys.display);

                // console.log('server', user_language);

                const server_store = createServerInitStore(user_language, user_currency, display_options);
                // preapre system pages uls
                // api_config.urls.wishlist = api_config.special_pages_urls.wishlist[user_language];
                // api_config.urls.homepage = api_config.special_pages_urls.homepage[user_language];
                // api_config.urls.cart = api_config.special_pages_urls.cart[user_language];
                const new_routes_config = {
                    language: languages,
                    urls: api_config.urls,
                    special_pages_urls: api_config.special_pages_urls
                }
                // console.log('server multilanguage: ', multilanguage);
                const new_Routes = prepare_routes_config(new_routes_config, user_language, multilanguage, true);
                // console.log(new_Routes[0].routes);
                const load_data_promises = matchRoutes(new_Routes, req.path).map(({ route }) => {
                    // console.log(req);
                    // const real_path = req.path.split('/').pop();
                    const real_path = get_reques_slug(req.path);

                    // console.log(real_path);

                    const i = req.url.indexOf('?');
                    const q = req.url.indexOf('&');
                    let query = null;
                    if (i > 0) {
                        if (q > 0) {
                            query = req.url.substring(i + 1, q);
                        } else {
                            query = req.url.substr(i + 1);
                        }
                    }
                    // console.log('server q: ', query);
                    return route.loadDataOnInit ? route.loadDataOnInit(route.type, server_store, api_config, user_language, real_path, query) : null;
                }).map(promise => {
                    // console.log('serverstore', server_store.getState());
                    // for fail promises, continue fetch data and resolve promises
                    // double primise (outer)
                    if (promise) {
                        return new Promise((resolve, reject) => {
                            promise.then(resolve).catch(resolve);
                        })
                    }
                });

                // console.log(api_config);
                Promise.all(load_data_promises).then(() => {
                    const server_context = {};
                    // const content = rednderHtml(req, server_store, server_context, css, insertCss);
                    // console.log('serverstore', server_store.dispatch);
                    const content = rednderHtml(req, server_store, server_context, new_routes_config, user_language, multilanguage);
                    if (server_context.url) {
                        return res.redirect(301, server_context.url);
                    }
                    if (server_context.notFound) {
                        res.status(404);
                    }
                    res.send(content);

                    // const key = req.path;
                    // const item = {
                    //     content: content
                    // };
                    // const options = {
                    //     life: 60,   // set lifespan of one minute
                    //     tags: [req.path]
                    // };
                    // cache.set(key, item, options);
                    // https://www.npmjs.com/package/node-file-cache
                })
            };
        }).catch(err => {
            console.error('❌ Error parsing request', err);
        })
    // }

});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log('📟 Listening on port:', port);
});