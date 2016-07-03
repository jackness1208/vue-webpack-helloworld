'use strict';
require('./p-index.scss');

var Vue = require('vue');

module.exports = Vue.extend({
    template: require('./p-index.jade')(),
    data: function(){
        return {
            recommendItems: []
        };
    },
    
    methods: {

    },
    events: {

    },
    components: {
        'wHeader': require('../../widget/w-header/w-header.vue'),
        'wFooter': require('../../widget/w-footer/w-footer.js'),
        'wRecommend': require('../../widget/w-videoRecommend/w-videoRecommend.js')
    },
    ready: function(){
        this.$data.recommendItems = window.pageInfo.recommends;
    }
});
