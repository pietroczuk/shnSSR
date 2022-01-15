const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
// const autoprefixer = require('autoprefixer');

module.exports = {
    // Tell webpack to run bable every time for JS files
    // for new syntax ES2015 without require -> import();
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                // test: /\.js?$/,
                // use: [
                //     {
                //         loader: 'babel-loader',
                //     },
                // ],
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
                    plugins: ['@loadable/babel-plugin']
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: "isomorphic-style-loader" }, // for ssr
                    // { loader: "style-loader" }, // to inject the result into the DOM as a style block
                    // "css-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // modules: true, // default true
                            esModule: false,
                            // for normal names
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]'
                                // localIdentName: '[local]' 
                            }
                            /* modules: {
                                 compileType: "module",
                                 mode: "local",
                                 auto: true,
                                 exportGlobals: true,
                                 localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                 localIdentContext: path.resolve(__dirname, "src"),
                                 localIdentHashPrefix: "my-custom-hash",
                                 namedExport: true,
                                 exportLocalsConvention: "camelCaseOnly",
                                 exportOnlyLocals: false,
                               }, */


                            // localIdentName: '[hash:base64:5]_[name]_[local]' // name of classess
                            // importLoaders: 1,
                        }
                    },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers,
                    { loader: "sass-loader" },  // to convert SASS to CSS
                    // { loader: "postcss-loader" }
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
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
        //     cacheGroups: {
        //         default: false,
        //         vendors: false,
        //     }
        // }

        // runtimeChunk: false,
        // splitChunks: {
        //   chunks(chunk) {
        //     return false
        //   },
        // },
    },
    // devtool: 'source-map',
    // performance: {
    //     hints: false,
    //     maxEntrypointSize: 512000,
    //     maxAssetSize: 512000
    // },
    // resolve:{
    //     alias: {
    //       react: path.resolve('./node_modules/react')
    //     }
    // },
    // npm ls react
    // alias: {
    //     react: path.resolve('./node_modules/react')
    //   },

    // mode: 'development' //development | production
    // mode: 'production'
};



/***
 *
 *
 *
 * studio/Documents/shn/shn2021/node_modules/isomorphic-style-loader
 *
 * wywalic node modules i poprawic wersje reacta
 *
 */