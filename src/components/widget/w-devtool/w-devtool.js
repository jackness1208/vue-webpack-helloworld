'use strict';
var 
    Vue = require('vue'),
    getters = require('getters'),
    actions = require('actions');

require('./w-devtool.scss');


module.exports = Vue.extend({
    template: require('./w-devtool.jade')(),
    vuex: {
        getters: {
            logs: getters.logs
        },
        actions: {
            clearLog: actions.clearLog,
            trace: actions.trace

        }
    },
    data: function(){
        return {
            debug: ~window.location.href.indexOf('debug'),
            modeCheck: false,
            checking: 0,

            debugtoolSlide: false,
            debugtoolFullpage: false,
            debugtoolFilter: true,
            logFilter: {
                all: true,
                success: true,
                ajax: true,
                info: true,
                error: true,
                warn: true,
                ws: true,
                stat: true,
                loop: true

            },
            debugtoolLatest: true,
            isTest: false


        };
    },
    methods: {
        ctrlClick: function(type){
            var tool = this.$els.debugtoolmain,
                data = this.$data;
            switch(type){
                case 'totop':
                    tool.scrollTop = 0;
                    break;

                case 'reload':
                    location.reload();
                    break;

                case 'fullpage':
                    data.debugtoolSlide = false;
                    data.debugtoolFullpage = true;
                    break;

                case 'normalpage':
                    data.debugtoolSlide = false;
                    data.debugtoolFullpage = false;
                    break;

                case 'clear':
                    this.clearLog();
                    break;

                case 'slide':
                    data.debugtoolSlide = !this.$data.debugtoolSlide;
                    data.debugtoolFullpage = false;
                    break;

                case 'filter':
                    this.$data.debugtoolFilter = !this.$data.debugtoolFilter;
                    break;

                case 'latest':
                    this.$data.debugtoolLatest = true;
                    break;

                case 'nolatest':
                    this.$data.debugtoolLatest = false;
                    break;
            }



        },

        switchFilter: function(type){
            var 
                logFilter = this.$data.logFilter,
                key;
            switch(type){
                case 'all':
                    var ok = false;
                    for(key in logFilter){
                        if(logFilter.hasOwnProperty(key)){
                            if(logFilter[key] === false){
                                ok = true;
                            }
                            break;
                        }
                    }

                    for(key in logFilter){
                        if(logFilter.hasOwnProperty(key)){
                            logFilter[key] = ok;
                        }
                    }
                    logFilter.all = ok;
                    break;

                default:
                    logFilter[type] = !logFilter[type];
                    break;
            }
            // this.$data.debugtoolFilterType = type;
        },
        
        // - debug tool event
    },
    ready: function(){
        
        var she = this,
            data = she.$data,
            debugCheckTouchStart = function(e){
                
                if(!data.modeCheck){
                    data.modeCheck = true;
                    setTimeout(function(){
                        data.checking = 0;
                        data.modeCheck = false;
                    }, 1000);
                }
                if(e.touches.length == 3){
                    data.checking++;
                }

                if(data.checking >= 3){
                    data.debug = !data.debug;
                }

            };

        if(~location.hash.indexOf('vtest')){
            data.isTest = true;
        } else {
            data.isTest = false;
        }

        window.onerror = function(a, b, c){
            she.trace('error', 'window error', a, b, 'line', c);
        };

        window.addEventListener('touchstart', debugCheckTouchStart);

    },
    watch: {
         'logs': {
            handler: function(){
                var tool = this.$els.debugtoolmain;

                if(this.$data.debugtoolLatest){
                    setTimeout(function(){
                        tool.scrollTop = tool.scrollHeight;
                    }, 10);
                }

            }
        }
    }
});
