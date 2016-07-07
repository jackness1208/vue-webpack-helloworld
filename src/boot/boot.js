'use strict';
require('./boot.scss');
var 
    Vue = require('vue'),
    VueRouter = require('vue-router');

Vue.use(VueRouter);

var 
    app = Vue.extend({
        el: function(){
            return '#app';
        },
        data: function(){
            return {};
        },
        components: {
            // 'p-index': function(done){
            //     require('../components/pages/index/index.vue', done);
            // },
            // 'p-sub': function(done){
            //     require('../components/pages/sub/sub.vue', done);
            // }
        }
    }),
    router = new VueRouter();

router.map({
    '/index': {
        component: require('../components/page/p-index/p-index.js')
    },
    '/sub': {
        component: require('../components/page/p-sub/p-sub.vue')

    }
});

router.redirect({
    '*': '/index'
});

router.start(app, '#app');


// window.addEventListener('hashchange', router);
// window.addEventListener('load', router);


