'use strict';
var Vue = require('vue');
require('./w-videoRecommend.scss');


module.exports = Vue.extend({
    template: require('./w-videoRecommend.jade')(),
    props: ['dataType', 'dataPage', 'dataItems', 'dataTitle'],
    data: function(){
        return {
            type: '',
            page: '',
            title: '',
            items: [
                // {
                //     url: '',
                //     videoUrl: '',
                //     cover: '',
                //     title: '',
                //     count: '',
                //     tag: ''

                // }
            ]

        };
    },
    ready: function(){
        
        console.log('ready!!')
        console.log(this);
    },
    methods: {
        itemchange: function(){
            console.log('change!!')
            $('.share-recommend-item .cover').lazyload({
                'failure_limit': Infinity
            });
            $(window).trigger('scroll');    
        }
    }
});
