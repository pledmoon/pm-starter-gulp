"use strict";

global.$ = {
  path: {
    task: require('./gulp/path/tasks.js'),
  },
  gulp: require('gulp'),
  browserSync: require('browser-sync').create(),
  del: require('del'),
};

$.path.task.forEach((taskPath) => {
  require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'pug',
    'fonts',
    'videos',
    'styles:dev',
    'img:dev',
    'libsJS:dev',
    'js:dev',
    'svg',
  )
));

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'pug',
    'fonts',
    'videos',
    'styles:build-min',
    'img:build',
    'libsJS:build',
    'js:build-min',
    'svg',
  ),
));

$.gulp.task('default', $.gulp.series(
  'dev',
  $.gulp.parallel(
    'watch',
    'server',
  )
));