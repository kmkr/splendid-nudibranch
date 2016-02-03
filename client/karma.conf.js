const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        reporters: ['mocha'],
        files: [
            './scripts/polyfills.js',
            '**/*_test.js'
        ],
        preprocessors: {
            './scripts/polyfills.js': ['webpack'],
            '**/*_test.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'eslint-loader'
                    },
                    {
                        test: /\.scss$/,
                        loaders: ['style', 'css', 'sass']
                    },
                    // Enzyme related workaround, https://github.com/airbnb/enzyme/issues/47
                    {
                        test: /\.json$/,
                        loader: 'json'
                    }
                ],
                // Workaround due to Enzyme and Sinon
                // https://github.com/airbnb/enzyme/issues/47
                // https://github.com/webpack/webpack/issues/304
                noParse: [
                    /node_modules\/sinon\//
                ]
            },
            // Enzyme related workaround, https://github.com/airbnb/enzyme/issues/47
            externals: {
                'jsdom': 'window',
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'text-encoding': 'window'
            },
            // Workaround due to Enzyme and Sinon
            // https://github.com/airbnb/enzyme/issues/47
            // https://github.com/webpack/webpack/issues/304
            resolve: {
                alias: {
                    sinon: 'sinon/pkg/sinon'
                }
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Promise: 'exports?global.Promise!es6-promise',
                    fetch: 'exports?self.fetch!whatwg-fetch'
                })
            ]
        },
        webpackServer: {
            noInfo: true
        }
    });
};
