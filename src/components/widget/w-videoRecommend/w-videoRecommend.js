'use strict';
var Vue = require('vue');
require('./w-videoRecommend.scss');


module.exports = Vue.extend({
    template: require('./w-videoRecommend.jade')(),
    props: ['dataType', 'dataPage', 'dataItems', 'dataTitle'],
    
    watch: {
        'dataItems': {
            handler: function(val, oldVal){
                $('.share-recommend-item .cover').lazyload({
                    'failure_limit': Infinity
                });
                $(window).trigger('scroll');
            }
        }
    },
    ready: function(){
    },
    methods: {
        
    }
});
