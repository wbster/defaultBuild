const path = require('path')

const MiniCss = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        polyfill: '@babel/polyfill',
        index: './public/js/index.js',
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/i,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }]
        }, {
            test: /\.sc?ss$/, // стили
            use: [
                MiniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        }, {
            test: /\.pug$/i, // верстка
            use: [
                'pug-loader'
            ]
        }, {
            test: /\.(png|svg|jpe?g|gif)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCss({
            filename: "main.css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new HTMLWebpackPlugin({
            title: 'Caching',
            filename: 'index.html',
            template: path.join(__dirname, './public/templates/index.pug')
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
}
