'use strict';
var 
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    // webpack = require('gulp-webpack'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    webpackConfig = require('./webpack.config.js'),
    inlinesource = require('gulp-inline-source'),
    gulpJade = require('gulp-jade');

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
            root: './dist',
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

gulp.task('jade', function(){
    return gulp.src('./src/boot/*.jade')
        .pipe(gulpJade({
            pretty: true,
            client: false
        }))
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist/html'));
});
gulp.task('sass', function(){
    return gulp.src('./src/boot/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function(){
    return gulp.src('./src/js/lib/**/*.*')
        .pipe(gulp.dest('./dist/js/lib'));
});

gulp.task('all', ['webpack', 'jade', 'sass', 'copy'], function(){});

gulp.task('watch', ['connect', 'all'], function(){
    gulp.watch('./src/boot/*.jade', function(){
        runSequence('jade', 'connect-reload')
    });
    gulp.watch('./src/boot/*.scss', function(){
        runSequence('sass', 'connect-reload')
    });
    gulp.watch(['./src/components/**/*.*'], function(){
        runSequence('webpack','sass', 'connect-reload')
    });
});
