/* ---------------- Main server file ----------------- */

// import async await - babel-polyfil
// import 'babel-polyfill';

import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';

import rednderHtml from './utils/rednderHtml';
import { createServerInitStore } from './utils/serverInitStore';
// routes
import { matchRoutes } from 'react-router-config';

import axios from 'axios';

import { prepareRoutesConfig } from '../client/utils/config';

// user language init
import {
    checkUserLanguage,
    getCurrencyCookie,
    getDisplayCookies,
    urlDataFromPath
} from './utils/utilsBackend';
import { SystemConfig } from '../client/redux/types/systemConfig.types';
import { NewRoutesConfig } from './types/newRoutesConfig.types';

/** CACHE */
// const cache = require('node-file-cache').create();

const app = express();
app.disable('x-powered-by');
// tell where is public files -> dir
app.use(compression());
app.use(express.static('public_html/public', { maxAge: '1y' }));

dotenv.config({ path: 'public_html/server/.env' });

if (!process.env.API_URL) {
    console.error('❌ Error load env file!')
} else {
    console.log('🗂  Local env config file load Success!');

    const api = {
        url: process.env.API_URL,
        config: process.env.API_CONFIG_URL,
    }
    const apiUrl = api.url;

    app.get('*', (req: express.Request, res: express.Response) => {
        // const cachedItem = cache.get(req.path);
        // if(cachedItem) {
        //     res.send(cachedItem.content);
        //     console.log('from cache');
        // }else{

        axios.get(apiUrl + api.config)
            .then(apires => {
                console.log('🌎 Web Api config load Success!');
                return apires.data;
            })
            .catch(err => {
                console.error('❌ Error get config file', err);
            }).then((api_config: SystemConfig) => {
                const multilanguage = api_config.multilanguage;
                const languages = api_config.language;
                const urlData = urlDataFromPath(req.path, languages, multilanguage);
                const languageFromUrl = urlData.languageCode;
                const real_path = urlData.realPath;
                const blankUrl = req.path === '/' || urlData.blankPath ? true : false;
                const user_language =
                    multilanguage ?
                        blankUrl ?
                            checkUserLanguage(req.headers.cookie, req.headers['accept-language'], languages, api_config.cookies_keys.user_language)
                            :
                            languageFromUrl
                        :
                        Object.values(languages)[0]['code'];
                if (blankUrl && user_language) {
                    const homepageUrl =
                        api_config.special_pages_urls &&
                            api_config.special_pages_urls.homepage ?
                            multilanguage ?
                                user_language + '/' + api_config.special_pages_urls.homepage[user_language]
                                : api_config.special_pages_urls.homepage[user_language]
                            : user_language;
                    res.redirect('/' + homepageUrl);
                } else {
                    const user_currency = getCurrencyCookie(req.headers.cookie, api_config.currency, api_config.cookies_keys.user_currency);
                    // get display cookies
                    const display_options = getDisplayCookies(req.headers.cookie, api_config.cookies_keys.display);
                    const server_store = createServerInitStore(user_language, user_currency, display_options);

                    // preapre system pages uls
                    // api_config.urls.wishlist = api_config.special_pages_urls.wishlist[user_language];
                    // api_config.urls.homepage = api_config.special_pages_urls.homepage[user_language];
                    // api_config.urls.cart = api_config.special_pages_urls.cart[user_language];
                    const new_routes_config: NewRoutesConfig = {
                        language: languages,
                        urls: api_config.urls,
                        special_pages_urls: api_config.special_pages_urls
                    }
                    const new_Routes = prepareRoutesConfig(new_routes_config, user_language, multilanguage);
                    const load_data_promises = matchRoutes(new_Routes, req.path).map(({ route }) => {
                        const i = req.url.indexOf('?');
                        const q = req.url.indexOf('&');
                        let query = null;
                        if (i > 0) {
                            if (q > 0) {
                                query = req.url.substring(i + 1, q);
                            } else {
                                query = req.url.substring(i + 1);
                            }
                        }
                        return route.loadDataOnInit ? route.loadDataOnInit(route.type, server_store, api_config, user_language, real_path, query) : null;
                    }).map(promise => {
                        // for fail promises, continue fetch data and resolve promises
                        // double primise (outer)
                        if (promise) {
                            return new Promise((resolve, _reject) => {
                                promise.then(resolve).catch(resolve);
                            })
                        }
                        return null;
                    });

                    Promise.all(load_data_promises).then(() => {
                        const server_context: { url?: any, notFound?: any } = {};
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
}