const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// const nodeExternals = require('webpack-node-externals');
// const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');

const config = {
    // inform webpack taht we're building a bundle
    // for nodeJS, not for the browser
    target: 'node',
    // externalsPresets: { node: true },

    // for view.js error
    // externals: [nodeExternals(
    //     {
    //     allowlist: [
    //         'babel-polyfill', 
    //         'express', 
    //         'compression',
    //         'axios',
    //         // 'react-router-config'
    //     ]
    // }
    // )
// ],

    // Tell webpack the root file of our
    // server app
    entry: './src/server/server.js',

    // tell webpack where to put the generate file
    output: {
        filename: 'server.js',
        // current folder, destiny folder name -> build
        // chunkFilename: '[contenthash].server.js',
        path: path.resolve(__dirname, './public_html/server'),
        pathinfo: false
    },
    // optimization: {
    //     runtimeChunk: false,
    //     splitChunks: {
    //         chunks(chunk) {
    //             return false;
    //         },
    //     },
    // },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    // plugins: [
    //     new webpack.optimize.LimitChunkCountPlugin({
    //         maxChunks: 1
    //     })
    // ]
    // plugins: [
    //     // new WebpackManifestPlugin({
    //     //     fileName: path.resolve(__dirname, './public_html/server') + '/client_hash.json',
    //     // }),
    //     new LoadablePlugin(
    //         {
    //             filename: 'loadable-stats-server.json',
    //             writeToDisk: true,
    //             // outputAsset: true,

    //             // writeToDisk: false,
    //             outputAsset: false,
    //         }
    //     )
    // ],

};

module.exports = merge(baseConfig, config);