module.exports = {
    context: __dirname,
    entry: {
        'bundle': './scripts/index.js',
        'admin-bundle': './scripts/admin/index.js'
    },
    devtool: 'source-map',
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
            }
        ]
    }
};
