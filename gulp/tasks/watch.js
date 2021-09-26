module.exports = () => {
  $.gulp.task('watch', () => {
    $.gulp.watch('./src/pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./src/assets/styles/**/*.scss', $.gulp.series('styles:dev'));
    $.gulp.watch('./src/assets/images/**/*.{png,jpg,gif}', $.gulp.series('img:dev'));
    $.gulp.watch('./src/assets/images/svg/*.svg', $.gulp.series('svg'));
    $.gulp.watch('./src/assets/js/**/*.js', $.gulp.series('js:dev'));
  });
};