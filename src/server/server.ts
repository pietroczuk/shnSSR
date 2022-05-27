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
import { SystemConfig } from '../client/redux/Models/SystemConfig/SystemConfig.type';
import { NewRoutesConfig } from './types/newRoutesConfig.types';

import MobileDetect from 'mobile-detect';

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
                const isMultilanguage = api_config.isMultilanguage;
                const allLanguages = api_config.allLanguages;
                const urlData = urlDataFromPath(req.path, allLanguages, isMultilanguage);
                const languageFromUrl = urlData.languageCode;
                const real_path = urlData.realPath;

                const blankUrl = req.path === '/' && urlData.blankPath ? true : false;
                const language =
                    isMultilanguage ?
                        blankUrl ?
                            checkUserLanguage(req.headers.cookie, req.headers['accept-language'], allLanguages, api_config.cookiesKeys.userLanguage)
                            :
                            languageFromUrl
                        :
                        Object.values(allLanguages)[0]['code'];
                const homepageUrl =
                    api_config.specialPagesUrlsArray &&
                        api_config.specialPagesUrlsArray.homepage ?
                        isMultilanguage ?
                            language + '/' + api_config.specialPagesUrlsArray.homepage[language]
                            : api_config.specialPagesUrlsArray.homepage[language]
                        : language;
                const homepageUrlAsRequest = '/' + homepageUrl === req.path ? true : false;
                // console.log('isMultilanguage', isMultilanguage, 'blankUrl', blankUrl, 'homepageUrl', homepageUrl, 'req.path', req.path, 'language', language, 'homepageUrlAsRequest', homepageUrlAsRequest)
                if (homepageUrl && (blankUrl || !isMultilanguage) && !homepageUrlAsRequest) {
                    res.redirect('/' + homepageUrl);
                } else {
                    const mobileDetect = new MobileDetect(req.headers['user-agent']);
                    const isMobile = mobileDetect.mobile() || mobileDetect.phone() || mobileDetect.tablet() ? true : false;
                    // console.log( mobileDetect.mobile() );          // 'Sony'
                    // console.log( mobileDetect.phone() );           // 'Sony'
                    // console.log( mobileDetect.tablet() );          // null
                    // console.log( mobileDetect.userAgent() );       // 'Safari'
                    // console.log( mobileDetect.os() );              // 'AndroidOS'
                    // console.log( mobileDetect.is('iPhone') );      // false
                    // console.log( mobileDetect.is('bot') );         // false
                    // console.log( mobileDetect.version('Webkit') );         // 534.3
                    // console.log( mobileDetect.versionStr('Build') );       // '4.1.A.0.562'
                    // console.log( mobileDetect.match('playstation|xbox') ); // false

                    const userCurrency = getCurrencyCookie(req.headers.cookie, api_config.allCurrencies, api_config.cookiesKeys.userCurrency);
                    // get display cookies
                    const display_options = getDisplayCookies(req.headers.cookie, api_config.cookiesKeys.displayKeys);
                    display_options.isMobile = isMobile;

                    const server_store = createServerInitStore(language, userCurrency, display_options);

                    // preapre system pages uls
                    // api_config.pageTypePrefixUrls.wishlist = api_config.specialPagesUrlsArray.wishlist[language];
                    // api_config.pageTypePrefixUrls.homepage = api_config.specialPagesUrlsArray.homepage[language];
                    // api_config.pageTypePrefixUrls.cart = api_config.specialPagesUrlsArray.cart[language];
                    const new_routes_config: NewRoutesConfig = {
                        allLanguages: allLanguages,
                        pageTypePrefixUrls: api_config.pageTypePrefixUrls,
                        specialPagesUrlsArray: api_config.specialPagesUrlsArray
                    }
                    const new_Routes = prepareRoutesConfig(new_routes_config, language, isMultilanguage);

                    // console.log(new_Routes);

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
                        return route.loadDataOnInit ? route.loadDataOnInit(route.type, server_store, api_config, language, real_path, query) : null;
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
                        const content = rednderHtml(req, server_store, server_context, new_routes_config, language, isMultilanguage);
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