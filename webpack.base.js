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
                    ]
                }
            }
        ]
    },
    // stats: {
    //     colors: true,
    //     modules: true,
    //     reasons: true,
    //     errorDetails: true
    // },
    mode: 'development' //development | production
};