const plumber = require('gulp-plumber'),
      scss = require('gulp-sass')(require('sass')),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso'),
      csscomb = require('gulp-csscomb'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      stylesPATH = {
        'input': './src/assets/styles/',
        'ouput': './dist/assets/css/',
      };

module.exports = () => {
  $.gulp.task('styles:dev', () => {
    return $.gulp.src(stylesPATH.input + 'styles.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(scss({ includePaths: ['node_modules'] }).on('error', scss.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
      }))
      .pipe(sourcemaps.write())
      .pipe(rename('styles.min.css'))
      .pipe($.gulp.dest(stylesPATH.ouput))
      .on('end', $.browserSync.reload);
  });

  $.gulp.task('styles:build', () => {
    return $.gulp.src(stylesPATH.input + 'styles.scss')
      .pipe(scss({
        includePaths: ['node_modules'],
      }))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
      }))
      .pipe(csscomb())
      .pipe($.gulp.dest(stylesPATH.ouput))
  });

  $.gulp.task('styles:build-min', () => {
    return $.gulp.src(stylesPATH.input + 'styles.scss')
      .pipe(scss({
        includePaths: ['node_modules'],
      }))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
      }))
      .pipe(csscomb())
      // .pipe(csso())
      // .pipe(rename('styles.min.css'))
      .pipe(rename('styles.css'))
      .pipe($.gulp.dest(stylesPATH.ouput))
  });
};