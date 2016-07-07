'use strict';
var 
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    webpack = require('webpack'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    webpackConfig = require('./webpack.config.js');
    // extend = require('extend'),
    // config = require('./config.js');

// if(fs.existsSync('./config.mine.js')){
//     config = extend(config, require('./config.mine.js'));
// }

gulp.task('default', function(){
    console.log([
        '',
        '',
        '  Ustage:' + ' gulp <command>',
        '',
        '',
        '  Commands:',
        '    ' + 'watch              init project and watch',
        '    ' + 'connect            build local server',
        '    ' + 'webpack            run webpack',
        '    ' + 'all                init project',
        
        ''
    ].join(''));
});

gulp.task('connect', function(){
    connect.server({
            root: './build',
        livereload: true,
        port: 5000
    });
});
gulp.task('connect-reload', function(){
    return gulp.src('./package.json')
        .pipe(connect.reload());
    
});

gulp.task('webpack', function(done){
    webpack(webpackConfig, function(err, stats){
        if (err) {
          throw new gutil.PluginError('webpack', err);

        } else {
            gutil.log('[webpack]', 'run pass');

        }
        gutil.log('[webpack]', stats.toString());

        done();

    });

    // gulp.start('webpack');
    // return gulp.src('./src/boot/boot.js')
    //     .pipe(webpack(webpackConfig))
    //     .pipe(gulp.dest('./dist/js'));
});



gulp.task('all', ['webpack'], function(){});

gulp.task('watch', ['connect', 'all'], function(){
    // gulp.watch('./src/boot/*.jade', function(){
    //     runSequence('jade', 'connect-reload');
    // });
    gulp.watch('./src/boot/*.scss', function(){
        runSequence('sass', 'connect-reload');
    });
    gulp.watch(['./src/components/**/*.*'], function(){
        runSequence('webpack','sass', 'connect-reload');
    });
});
