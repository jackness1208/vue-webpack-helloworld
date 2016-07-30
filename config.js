'use strict';
var 
    config = {
        hostname: '/brithday/',
        alias: {
            root: './dist',

        },
        path: {
            root: './dist',
            dest: './dist/brithday',
            rev: './dist/brithday/assets/rev-manifest.json',
            jsDest: './dist/brithday/js'
        },
        commit: {
            // trunk: {
            //     revAddr: 'http://s1.yy.com/website_static/assets/rev-manifest.json',
            //     // versionFile: '{$trunk}/WEB-INF/views/h5/play_modules.jsp',
            //     git: {
            //         update: [
            //             '{$commons}'
            //         ]
            //     },
            //     svn: {
            //         update: [
            //             '{$trunk}/assets',
            //             '{$trunk}/play_static',
            //         ],
            //         copy: {
            //             '{$root}/play_static': [
            //                 '{$trunk}/play_static'
            //             ],
            //             '{$root}/play_static/assets': [
            //                 '{$trunk}/assets',
            //                 '{$trunk}/play_static/assets'
            //             ]
            //         },
            //         commit: [
            //             '{$trunk}/play_static/js',
            //             '{$trunk}/play_static/css',
            //             '{$trunk}/play_static/html',
            //             '{$trunk}/play_static/images',
            //             '{$trunk}/play_static/assets',
            //             '{$trunk}/assets' 
            //         ]
            //     }
            // },
        }
    };

module.exports = config;
