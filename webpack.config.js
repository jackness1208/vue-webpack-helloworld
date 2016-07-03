'use strict';
module.exports = {
    entry: {
        'boot': './src/boot/boot.js'
    },
    output: {
        path: './dist/js',
        filename: '[name].js'

    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            loaders: ['babel-loader']

        }, {
            test: /\.vue$/,
            loaders: ['vue']
        }, {
            test: /\.scss$/,
            loaders: ['style','css','sass']
        }, {
            test: /\.jade$/,
            loaders: ['jade-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url'
        }]

    },
    resolve: {
        root: './',
        alias: {
            'lazyload': './src/js/lib/lazyload/jquery.lazyload.min.js',
            'zepto': 'src/js/lib/zepto/yymzepto.min.js',
            'mixin': 'src/scss/_mixin.scss'
        }
    },
    devtool: 'source-map'


};
