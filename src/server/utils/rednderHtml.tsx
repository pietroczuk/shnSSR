import { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { prepareRoutesConfig } from '../../client/utils/config';

import { Provider } from 'react-redux';
// <Routes/> teraz są jako array []
// aby mozna bylo pobierac dane
// musimy inaczej zrenderowac
import { renderRoutes } from 'react-router-config';

import serialize from 'serialize-javascript';

// SEO
import { Helmet } from 'react-helmet';

import StyleContext from 'isomorphic-style-loader/StyleContext';

// import { minify } from 'html-minifier';

import { ChunkExtractor } from '@loadable/server';

import path from 'path';
import { EnhancedStore } from '@reduxjs/toolkit';
import { NewRoutesConfig } from '../types/newRoutesConfig.types';

interface renderHtml {
  (
    req: {
      path: string
    },
    server_store: EnhancedStore,
    context: object,
    new_routes_config: NewRoutesConfig,
    language: string,
    isMultilanguage: boolean
  ): string
}

export const rednderHtml: renderHtml = (req, server_store, context, new_routes_config, language, isMultilanguage) => {
  const webStats = path.resolve(
    __dirname,
    '../../public_html/server/loadable-stats.json',
  )
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const css = new Set(); // CSS for all rendered React components
  // console.log(...styles);
  const insertCss = (...styles: any[]) => styles.forEach(style => css.add(style._getCss()));

  const content = renderToString(
    webExtractor.collectChunks(
      <Provider store={server_store}>
        <StyleContext.Provider value={{ insertCss }}>
          <StaticRouter location={req.path} context={context}>
            <Fragment>
              {renderRoutes(prepareRoutesConfig(new_routes_config, language, isMultilanguage))}
            </Fragment>
          </StaticRouter>
        </StyleContext.Provider>
      </Provider>
    )
  );

  //------------ loadable
  // const nodeStats = path.resolve(
  //   __dirname,
  //   '../../../public_html/server/ ../../public/dist/node/loadable-stats.json',
  // )



  //------------ end loadable

  // <link rel="stylesheet" href="/css/minireset.min.css" />
  // <script defer src="`+ hash + `"></script> 

  // prefetch
  // ${webExtractor.getLinkTags()} 


  const server_helmet = Helmet.renderStatic();
  const html = `
  <!DOCTYPE html>
        <html lang="${language}">
            <head>
              ${server_helmet.title.toString()}
              ${server_helmet.meta.toString()}
              ${server_helmet.link.toString()}
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="shortcut icon" href="/images/shineposters_favicon_dark_black.png">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png"/>
              <link rel="manifest" href="/manifest.json"/>
              <meta name="apple-mobile-web-app-status-bar-style" content="black">
              <meta name="apple-mobile-web-app-title" content="SHN">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="57x57">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="60x60">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="72x72">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="76x76">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="114x114">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="120x120">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="144x144">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="152x152">
              <link rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png" sizes="180x180">
              <link rel="preconnect" href="https://cdn.shineposters.com" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

              <meta name="msapplication-TileImage" content="/images/shineposters_favicon_dark_black.png">
              <meta name="msapplication-TileColor" content="#fff">
              <meta name="theme-color" content="#000000">
              <meta name="robots" content="noindex">
              <script>
                  window.__INITIAL_STATE__ = ${serialize(server_store.getState())};
                  window.__CONFIG__ = ${serialize(new_routes_config)};
              </script>
              
              ${webExtractor.getStyleTags()}
              <style>${[...css].join('')}</style>
              <link rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin />

              <!-- [2] -->
              <link rel="preload"
                    as="style"
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" />

              <!-- [3] -->
              <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
                    media="print" onload="this.media='all'" />

              <!-- [4] -->
              <noscript>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" />
              </noscript>
            </head>
            <body>
                <div id="root">${content}</div>
                ${webExtractor.getScriptTags().replace(/async/g, "defer")}
                
                
            </body>
           
        </html>
    `;
  // const html_mini = minify(html, {
  //   collapseWhitespace: true,
  //   collapseInlineTagWhitespace: true,
  //   minifyCSS: true,
  // });
  // return html_mini;
  return html;
}
export default rednderHtml;