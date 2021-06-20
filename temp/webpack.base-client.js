const TerserPlugin = require('terser-webpack-plugin');
// const LoadablePlugin = require('@loadable/webpack-plugin');
// const autoprefixer = require('autoprefixer');

module.exports = {
    // Tell webpack to run bable every time for JS files
    // for new syntax ES2015 without require -> import();
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/react',
                        ['@babel/env', {
                            targets: {
                                browsers: ['last 2 versions']
                            }
                        }]
                    ],
                    // plugins: ['@loadable/babel-plugin']
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    { loader: "isomorphic-style-loader" }, // for ssr
                    { loader: "style-loader" }, // to inject the result into the DOM as a style block
                    // "css-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            esModule: false,
                            importLoaders: 1,
                        }
                    },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers,
                    { loader: "sass-loader" },  // to convert SASS to CSS
                    // { loader: "postcss-loader" }
                ]
            }
            // loader: "style-loader!css-loader" },
            // {
            //     test: /\.css$/,
            //     // exclude: /node_modules/,
            //     use: ['css-loader'],
            // }


            // {
            //     test: /\.css$/,
            //     use: [
            //         'isomorphic-style-loader',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 1,
            //                 esModule: false,
            //             },
            //         },
            //         'postcss-loader'
            //         // {
            //         //     loader: 'postcss-loader',
            //         //     options: {plugins: [autoprefixer()]}
            //         // }

            //     ]
            // }
        ]
    },
    // stats: {
    //     colors: true,
    //     modules: true,
    //     reasons: true,
    //     errorDetails: true
    // },
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
        // splitChunks: {
        //     chunks: 'all',
        // }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    // plugins: [new LoadablePlugin()],

    mode: 'development' //development | production
};