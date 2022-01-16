const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    // devtool: 'source-map',

    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //           'NODE_ENV': JSON.stringify('production')
    //         }
    //       })
    // ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
}