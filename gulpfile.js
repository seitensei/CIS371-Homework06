var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer');

gulp.task('default',['serve', 'watch'], function() {});

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions'] }),
      cssnano({ safe: true })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('./js/**/*.js')
    .pipe(connect.reload());
})

gulp.task('watch',['sass', 'html', 'js'], function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('serve', function() {
  connect.server({
    root: '.',
    port: 3000,
    livereload: true
  });
});
