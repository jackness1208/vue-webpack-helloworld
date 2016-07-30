'use strict';
var path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ManifestPlugin = require('webpack-manifest-plugin'),
    extend = require('node.extend'),
    fs = require('fs'),
    config = require('./config.js');


if(fs.existsSync('./config.mine.js')){
    config = extend(config, require('./config.mine.js'));
}

path.joinFormat = function(){
    var iArgv = Array.prototype.slice.call(arguments);
    var r = path.join.apply(path, iArgv);
    return r
        .replace(/\\+/g, '/')
        .replace(/(^http[s]?:)[\/]+/g, '$1//');
};


module.exports = {
    devServer:{
        host: '127.0.0.1',
        progress: true,
        colors: true,
        contentBase: config.path.root,
        port: 5000,
        // hot: true,
        // inline: true

    },
    entry: {
        'boot': './src/boot/boot.js',
        'vendors': ['flexlayout']
    },
    output: {
        path: path.join(__dirname, config.path.jsDest),
        publicPath: path.joinFormat(config.hostname, path.relative(config.path.dest, config.path.jsDest), '/'),
        filename: '[name]-[chunkhash:8].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader'

        }, {
            test: /\.vue$/,
            loaders: ['vue']
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css!sass")
        }, {
            test: /\.jade$/,
            loaders: ['jade-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=10000&name=../images/[name]-[hash:8].[ext]'
        }]

    },
    resolve: {
        root: './',
        alias: {
            'flexlayout': path.join(__dirname, './src/js/lib/flexlayout/flexlayout.js'),
            'actions': path.join(__dirname, './src/vuex/actions.js'),
            'getters': path.join(__dirname, './src/vuex/getters.js')
        }
    },
    devtool: 'source-map',
    plugins: [
        
        // 样式分离插件
        new ExtractTextPlugin("../css/boot-[chunkhash:8].css"),
        
        // html输出插件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/boot/boot.jade'),
            filename: '../html/boot.html',
            minify: false
        }),
        new ManifestPlugin({
            fileName: '../assets/rev-manifest.json',
            basePath: ''
        
        })
    ]

};
