module.exports = {
    context: __dirname,
    entry: './scripts/index.js',
    devtool: 'eval-source-map',
    output: {
        path: `${__dirname}/../server/static/scripts`,
        filename: 'bundle.js'
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
