module.exports = function () {
  $.gulp.task('videos', () => {
    return $.gulp.src('./src/assets/videos/**/*.*')
      .pipe($.gulp.dest('./dist/assets/videos/'));
  });
};