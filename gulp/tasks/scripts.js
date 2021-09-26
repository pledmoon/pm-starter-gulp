const uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      babel = require('gulp-babel'),
      scriptsPATH = {
        'input': './src/assets/js/',
        'ouput': './dist/assets/js/'
      };

module.exports = () => {
  $.gulp.task('libsJS:dev', () => {
    return $.gulp.src([
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/lightgallery/lightgallery.min.js',
      // 'node_modules/choices.js/public/assets/scripts/choices.min.js',
      //'node_modules/nouislider/distribute/nouislider.min.js',
      //'node_modules/drift-zoom/dist/Drift.min.js',
      //'node_modules/pikaday/pikaday.js',
      'node_modules/simplebar/dist/simplebar.min.js',
      'node_modules/@popperjs/core/dist/umd/popper.js',
      'node_modules/tippy.js/dist/tippy.umd.js',
      'src/assets/js/lib/Modal.js',
      //'src/assets/js/lib/inputmask.min.js',
      //'node_modules/card/dist/card.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task('libsJS:build', () => {
    return $.gulp.src([
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/lightgallery/lightgallery.min.js',
      // 'node_modules/choices.js/public/assets/scripts/choices.min.js',
      //'node_modules/nouislider/distribute/nouislider.min.js',
      //'node_modules/drift-zoom/dist/Drift.min.js',
      //'node_modules/pikaday/pikaday.js',
      'node_modules/simplebar/dist/simplebar.min.js',
      'node_modules/@popperjs/core/dist/umd/popper.js',
      'node_modules/tippy.js/dist/tippy.umd.js',
      'src/assets/js/lib/Modal.js',
      //'src/assets/js/lib/inputmask.min.js',
      //'node_modules/card/dist/card.js',
    ])
    .pipe(babel({
      presets: [ ['@babel/env', {modules: false}] ]
    }))
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task('js:dev', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe($.gulp.dest(scriptsPATH.ouput))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });

  $.gulp.task('js:build', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe($.gulp.dest(scriptsPATH.ouput))
  });

  $.gulp.task('js:build-min', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe(babel({
        presets: [ ['@babel/env', {modules: false}] ]
      }))
      .pipe(concat('main.js'))
      //.pipe(uglify())
      .pipe($.gulp.dest(scriptsPATH.ouput))
  });
};
