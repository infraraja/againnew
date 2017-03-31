'use strict'

var gulp = require('gulp')
var bump = require('gulp-bump');
var octo = require('@octopusdeploy/gulp-octo');
var env = process.env.NODE_ENV || 'development'
/*
var defaultTasks = ['clean', 'jshint', 'csslint','serve','watch'] // initialize with development settings
if (env === 'production') { var defaultTasks = ['clean', 'cssmin', 'uglify', 'serve', 'watch'];}
if (env === 'test')       { var defaultTasks = ['env:test', 'karma:unit', 'mochaTest'];}
*/
// read gulp directory contents for the tasks...
require('require-dir')('./gulp')
console.log('Invoking gulp -', env)
gulp.task('default', ['clean'], function (defaultTasks) {
  // run with paramater
  gulp.start(env)
})


gulp.task('bump', function(){
  return gulp.src('./package.json')
      .pipe(bump({type: 'patch'}))
      .pipe(gulp.dest('./'));
});

gulp.task('publish', ['bump', 'build'], function () {
  return gulp.src(['**/*', '!bin{,/**}', '!src{,/**}', '!gulpfile.js'])
      .pipe(octo.pack())
      .pipe(octo.push({apiKey: 'API-DXKI8KHUGA4TOMATSMV9WM4YBRG', host: 'http://localhost:9000'}));
});

