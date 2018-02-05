const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let prod = process.argv.indexOf('-p') !== -1;

let uglify = new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false
    }
});

let copy = new CopyWebpackPlugin([
    {
        from: path.join(__dirname, 'src/static/index.html'),
        to: path.join(__dirname, 'lib/static/index.html')
    },
    // {
    //     from: path.join(__dirname, 'src/static/assets'),
    //     to: path.join(__dirname, 'lib/static/assets')
    // }
]);

let extractSass = new ExtractTextPlugin({
    filename: 'style.css'
});

module.exports = {
    entry: [
        path.join(__dirname, '/src/static/scripts/main.jsx'),
        path.join(__dirname, '/src/static/styles/main.scss')
    ],
    output: {
        path: path.join(__dirname, 'lib/static'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ])
            }
        ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: prod ? [
        uglify,
        copy,
        extractSass
    ] : [
        copy,
        extractSass
    ]
};
