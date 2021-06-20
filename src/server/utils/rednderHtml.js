import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// import Routes from '../../client/Routes';
import { prepare_routes_config } from '../../client/utils/config';

import { Provider } from 'react-redux';
// <Routes/> teraz są jako array []
// aby mozna bylo pobierac dane
// musimy inaczej zrenderowac
import { renderRoutes } from 'react-router-config';

import serialize from 'serialize-javascript';

// SEO
import { Helmet } from 'react-helmet';

// import client_hash from '../../../public_html/server/client_hash';
// const hash = client_hash['main.js'];

import StyleContext from 'isomorphic-style-loader/StyleContext';

import { minify } from 'html-minifier';

// export default (req, server_store, context, css, insertCss) => {

import { ChunkExtractor } from '@loadable/server';
// import { ServerStyleSheet } from 'styled-components';

import path from 'path';



export default (req, server_store, context, new_routes_config) => {
  const css = new Set(); // CSS for all rendered React components
  // console.log(...styles);
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
  const content = renderToString(
    <Provider store={server_store}>
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter location={req.path} context={context}>
          {/* <Routes /> */}
          <React.Fragment>
            {renderRoutes(prepare_routes_config(new_routes_config, true))}
          </React.Fragment>
        </StaticRouter>
      </StyleContext.Provider>
    </Provider>
  );

  //------------ loadable
  // const nodeStats = path.resolve(
  //   __dirname,
  //   '../../../public_html/server/ ../../public/dist/node/loadable-stats.json',
  // )

  const webStats = path.resolve(
    __dirname,
    '../../public_html/server/loadable-stats.json',
  )
 

  const webExtractor = new ChunkExtractor({ statsFile: webStats });
 

  //------------ end loadable

  // <link rel="stylesheet" href="/css/minireset.min.css" />
  // <script defer src="`+ hash + `"></script> 
  const server_helmet = Helmet.renderStatic();
  const html = `
  <!DOCTYPE html>
        <html lang="${server_store.getState().user.language}">
            <head>
              ${server_helmet.title.toString()}
              ${server_helmet.meta.toString()}
              ${server_helmet.link.toString()}
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link async rel="shortcut icon" href="/images/shineposters_favicon_dark_black.png">
              <link async rel="apple-touch-icon" href="/images/shineposters_favicon_dark_black.png"/>
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
              <meta name="msapplication-TileImage" content="/images/shineposters_favicon_dark_black.png">
              <meta name="msapplication-TileColor" content="#fff">
              <meta name="theme-color" content="#000000">
              <script>
                  window.__INITIAL_STATE__ = ${serialize(server_store.getState())};
                  window.__CONFIG__ = ${serialize(new_routes_config)};
              </script>
              ${webExtractor.getLinkTags()}
              ${webExtractor.getStyleTags()}
              <style>${[...css].join('')}</style>
            </head>
            <body>
                <div id="root">${content}</div>
                ${webExtractor.getScriptTags()}
            </body>
           
        </html>
    `;
  const html_mini = minify(html, {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    minifyCSS: true,
  });
  // return html_mini;
  return html;
}