let rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    revSources = [
      './dist/assets/css/styles.min.css', 
      './dist/assets/js/main.js'
    ];

module.exports = function () {
  $.gulp.task('revision', () => {
    return $.gulp.src(revSources)
      .pipe(rev())
      .pipe($.gulp.dest(function(file) {
        return file.base;
      }))
      .pipe(rev.manifest())
      .pipe($.gulp.dest('./dist/assets/'));
  });

  $.gulp.task('revReplace', () => {
    const manifest = $.gulp.src('./dist/assets/rev-manifest.json')

    return $.gulp.src(['./dist/*.html'])
      .pipe(revReplace({ manifest: manifest }))
      .pipe($.gulp.dest('./dist/'));
  });
};