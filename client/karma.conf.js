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
                    }
                ]
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
