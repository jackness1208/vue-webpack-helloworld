'use strict';

var 
    Vue = require('vue'),
    Vuex = require('vuex');

Vue.use(Vuex);

var 
    state = {
        // 日志
        logs: [],
    };

var 
    mutations = {
        // 添加 log
        ADD_LOG: function(state, log){
            state.logs.push(log);
        },
        // 清除 log
        CLEAR_LOG: function(state){
            state.logs = [];
        }
    };

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
