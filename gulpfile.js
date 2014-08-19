var gulp = require('gulp'),
    kmc = require('gulp-kmc'),
    gulpFilter = require('gulp-filter'),
    kclean = require('gulp-kclean');


var src = './lib',
    build = './build',
    buildFile = build+'/xtemplate-standalone.js';

kmc.config({
    packages:{
       "xtemplate":{
           combine:true,
           base: src
        }
    }
});

gulp.task('build', function () {
    gulp.src(src+'/**/*.js')
        .pipe(kmc.convert())
        .pipe(kmc.combo({
             files:[{
                 src: src+'/xtemplate.js',
                 dest: buildFile
             }]
        }))
        .pipe(kclean({
            files:[{
                  src:buildFile,
                  wrap:{
                    start:"var XTemplate = (function(){",
                    end:'\nreturn xtemplate;\n})()'
                  }
            }]
         }))
        .pipe(gulpFilter(['xtemplate-standalone.js']))
        .pipe(gulp.dest(build));
});

gulp.task('default', ['server'], function () {
    gulp.watch('./lib/**/*.js', ['build']);
});

gulp.task('server', function () {
    require('./server');
});