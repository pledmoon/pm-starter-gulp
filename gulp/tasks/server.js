module.exports = () => {
  $.gulp.task('server', () => {
    $.browserSync.init({
      server: './dist',
    });
  });
};