const webpack = require('webpack');
const env = process.env.NODE_ENV;
const autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    entry: {
        'bundle': './src/index.js'
        // 'admin-bundle': './src/admin/index.js'
    },
    devtool: env !== 'production' ? 'source-map' : false,
    output: {
        path: `${__dirname}/../lib/server/static/scripts`,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'eslint-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(env !== 'production'),
            'process.env.NODE_ENV': JSON.stringify(env || 'development')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        })
    ]
};
