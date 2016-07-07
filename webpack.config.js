'use strict';
var 
    fs = require('fs'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ManifestPlugin = require('webpack-manifest-plugin'),
    extend = require('extend'),
    config = require('./config.js');

if(fs.existsSync('./config.mine.js')){
    config = extend(config, require('./config.mine.js'));
}

module.exports = {
    entry: {
        'boot': './src/boot/boot.js',
        'vendors': ['flexlayout','zepto', 'lazyload']
    },
    output: {
        path: './build/js',
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
            test: /\.jade$/,
            loaders: ['jade-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=5&name=../images/[name]-[hash:4].[ext]'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css!sass")
        }]

    },
    resolve: {
        root: './',
        alias: {
            'lazyload': './src/js/lib/lazyload/jquery.lazyload.min.js',
            'zepto': 'src/js/lib/zepto/yymzepto.min.js',
            'mixin': 'src/scss/_mixin.scss',
            'flexlayout': './src/js/lib/flexlayout/flexlayout.js'
        }
    },
    devtool: 'source-map',
    plugins: [
        
        new CleanWebpackPlugin(['dist', 'build'], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),
        // 样式分离插件
        new ExtractTextPlugin("../css/boot.css"),
        // html输出插件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/boot/boot.jade'),
            filename: '../html/boot.html'
        }),
        new ManifestPlugin({
            fileName: '../assets/rev-manifest.json',
            basePath: ''
        
        })
        // 生成文件 hash 映射 列表插件
        // new ManifestRevisionPlugin(path.join(__dirname, 'build/assets/rev-manifest.json'), {
        //     rootAssetPath: './build'
        // })
    ]


};
