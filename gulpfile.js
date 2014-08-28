var 
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  amdOptimize = require('gulp-amd-optimizer'),
  //concatSourcemap = require('gulp-concat-sourcemap'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso')
;

var outDirJS = 'public/assets/javascripts';
var outDirCSS = 'public/assets/stylesheets';

var requireConfig = {
  baseUrl: __dirname
};


gulp.task('Lint scripts', function () {
    return gulp.src(['src/js/**/*.js', 'libs/*.js', 'gulpfile.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task(
  'Concat modules', 
  function () {
    return gulp.src('src/js/*.js')
      .pipe(amdOptimize(requireConfig, { umd: false }))
      .pipe(concat('modules.js'))
      .pipe(gulp.dest(outDirJS));
  }
);

gulp.task(
  'Concat libraries', 
  function () {
    return gulp.src('libs/*.js')
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(outDirJS));
  }
);

gulp.task(
  'Compress scripts', 
  ['Concat modules', 'Concat libraries'], 
  function() {
    return gulp.src([outDirJS + '/libs.js', outDirJS + '/modules.js'])
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest(outDirJS));
  }
);

gulp.task(
  'Compress stylesheets', 
  function() {
    return gulp.src('src/css/*.css')
      .pipe(concat('all.min.css', {newLine: '\r\n'}))
      .pipe(csso())
      .pipe(gulp.dest(outDirCSS));
  }
);

gulp.task(
  'Copy index', 
  function() {
    return gulp.src('src/index.html')
      .pipe(gulp.dest('./public'));
});

gulp.task(
  'Copy data directory', 
  function() {
    return gulp.src('data/*.json')
      .pipe(gulp.dest('./public/data'));
});

gulp.task('default', [
  'Lint scripts',
  'Concat modules', 
  'Concat libraries', 
  'Compress scripts',
  'Compress stylesheets',
  'Copy index',
  'Copy data directory'
]);