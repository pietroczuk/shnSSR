const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const config = {
    // Tell webpack the root file of our
    // client app
    entry: './src/client/client.js',
    // devtool: 'source-map',
    // tell webpack where to put the generate file
    output: {
        // filename: 'client.js',
        filename: 'client.[fullhash].js',

        chunkFilename: '[contenthash].client.js',
        // current folder, destiny folder name -> build
        path: path.resolve(__dirname, './public_html/public'),
        pathinfo: false,
        publicPath: `/`,
    },
    plugins: [
        // new WebpackManifestPlugin({
        //     fileName: path.resolve(__dirname, './public_html/server') + '/client_hash.json',
        // }),
        new LoadablePlugin(
            {
                filename: '../server/loadable-stats.json',
                writeToDisk: true,
                // outputAsset: true,

                // writeToDisk: false,
                outputAsset: false,
            }
        )
    ],
    // resolve:{
    //     alias: {
    //       react: path.resolve('./node_modules/react')
    //     }
    // },
}

module.exports = merge(baseConfig, config);