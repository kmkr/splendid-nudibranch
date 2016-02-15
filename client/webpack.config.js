const webpack = require('webpack');
const env = process.env.NODE_ENV;

module.exports = {
    context: __dirname,
    entry: {
        'bundle': './src/index.js',
        'admin-bundle': './src/admin/index.js'
    },
    devtool: env !== 'production' ? 'source-map' : false,
    output: {
        path: `${__dirname}/../server/static/scripts`,
        filename: '[name].js'
    },
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(env !== 'production'),
            'process.env.NODE_ENV': JSON.stringify(env || 'development')
        })
    ]
};
