'use strict';

var 
    actions = {
        trace: function(store){
            var 
                type = arguments[1],
                iArgv = Array.prototype.slice.call(arguments).splice(2),
                fArgv = [].concat(iArgv),
                now = new Date().toString().toLocaleString().replace(/^.* (\d+\:\d+\:\d+) .*$/, '$1');

            
            switch(type){
                case 'info':
                    iArgv = ['%c[info]', 'color: #005982;'].concat(iArgv);
                    break;
                case 'error':
                    iArgv = ['%c[error]', 'color: #ff0000;'].concat(iArgv);
                    break;

                case 'success':
                    iArgv = ['%c[success]', 'color: #598527;'].concat(iArgv);
                    break;

                case 'warn':
                    iArgv = ['%c[warning]', 'color: #8a8000;'].concat(iArgv);
                    break;
                case 'ajax':
                    iArgv = ['%c[ajax]', 'color: #ff8900;'].concat(iArgv);
                    break;

                case 'ws':
                    iArgv = ['%c[ws]', 'color: #00a0e9;'].concat(iArgv);
                    break;

                case 'stat':
                    iArgv = ['%c[stat]', 'color: #f06eaa;'].concat(iArgv);
                    break;


                case 'loop':
                    iArgv = ['%c[loop]', 'color: #601986;'].concat(iArgv);
                    break;

                default:
                    iArgv = Array.prototype.slice.call(arguments).slice(1);
                    iArgv = ['%c[info]', 'color: #005982;'].concat(iArgv);
                    fArgv = Array.prototype.slice.call(arguments).slice(1);
                    type = 'info';
                    break;
            }

            iArgv[0] = '['+ now +'] ' + iArgv[0];

            if(this.logProfix){
                iArgv.splice(2, 0, '['+ this.logProfix +']');
                fArgv.splice(0, 0, '['+ this.logProfix +']');
            }

            var 
                argvTxt = (function(){
                    var r = [];
                    fArgv.forEach(function(item){
                        if(typeof item == 'object'){
                            try {
                                r.push(JSON.stringify(item));
                            } catch(er){
                                r.push(item);
                            }
                        } else {
                            r.push(item);
                        }
                    });
                    return r.join(' ');
                    

                }());

            console.log.apply(console, iArgv);
            var 
                logObj = {
                    time: now,
                    type: type,
                    txt: argvTxt
                };

            store.dispatch('ADD_LOG', logObj);
        },

        // 清除日志
        clearLog: function(store){
            store.dispatch('CLEAR_LOG');
        }

    };

module.exports = actions;
