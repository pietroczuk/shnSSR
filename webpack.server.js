const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const nodeExternals = require('webpack-node-externals');

const config = {
    // inform webpack taht we're building a bundle
    // for nodeJS, not for the browser
    target: 'node',

    // for view.js error
    externals: [nodeExternals()],

    // Tell webpack the root file of our
    // server app
    entry: './src/server/server.js',

    // tell webpack where to put the generate file
    output: {
        filename: 'server.js',
        // current folder, destiny folder name -> build
        path: path.resolve(__dirname, './public_html/server'),
        pathinfo: false
    },
   
};

module.exports = merge(baseConfig, config);