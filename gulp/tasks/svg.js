const svgSprite = require('gulp-svg-sprite'),
      svgmin = require('gulp-svgmin'),
      cheerio = require('gulp-cheerio'),
      replace = require('gulp-replace'),
      svgPath = {
        'input': './src/assets/images/svg/*.svg',
        'output': './dist/assets/images/svg/',
      };

module.exports = () => {
  $.gulp.task('svg', () => {
    return $.gulp.src(svgPath.input)
      .pipe(svgmin({
        js2svg: {
          pretty: true,
        }
      }))
      .pipe(cheerio({
        run: ($) => {
          $('[fill]').removeAttr('fill');
          // $('[stroke]').removeAttr('stroke');
          $('[stroke]').attr('stroke', 'currentColor');
          $('[style]').removeAttr('style');
          $('[data-name]').removeAttr('data-name');
          $('[class]').removeAttr('class');
          $('style').remove();
          $('title').remove();
        },
        parserOptions: { xmlMode: true },
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
          },
        },
      }))
      .pipe($.gulp.dest(svgPath.output));
  });
};
