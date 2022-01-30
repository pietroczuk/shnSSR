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

    // for view.js error
    // externals: [nodeExternals()],

    // Tell webpack the root file of our
    // server app
    // entry: path.resolve(__dirname, '../src/server/server.tsx'),
    entry: path.resolve(__dirname, '../src/server/server.ts'),
    // entry: './src/server/server.js',
    // simply import files with this extensions (webpack search ext. in this array)
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // tell webpack where to put the generate file
    output: {
        filename: 'server.js',
        // current folder, destiny folder name -> build
        // chunkFilename: '[contenthash].server.js',
        path: path.resolve(__dirname, '../public_html/server'),
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
    ignoreWarnings: [
        {
            module: /node_modules\/express\/lib\/view\.js/,
            message: /the request of a dependency is an expression/,
        },
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


module.exports = (envVars) => {
    const { env } = envVars; // dev | prod
    const envConfig = require(`./webpack.${env}.js`)
    return merge(baseConfig, config, envConfig);
}

// module.exports = merge(baseConfig, config);