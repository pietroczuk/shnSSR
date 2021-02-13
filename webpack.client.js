const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    // Tell webpack the root file of our
    // client app
    entry: './src/client/client.js',

    // tell webpack where to put the generate file
    output: {
        filename: 'bundle.js',
        // current folder, destiny folder name -> build
        path: path.resolve(__dirname, 'public')
    }
}

module.exports = merge(baseConfig, config);