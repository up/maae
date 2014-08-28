var 
  pkg = require('./package.json'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  amdOptimize = require('gulp-amd-optimizer'),
  //concatSourcemap = require('gulp-concat-sourcemap'),
  header = require('gulp-header'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso')
;

var outDirJS = 'public/assets/javascripts';
var outDirCSS = 'public/assets/stylesheets';

var requireConfig = {
  baseUrl: __dirname
};

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @repository <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  ' * @build <%= new Date().toLocaleString() %>',
  ' */',
  ''].join('\n');

gulp.task( 'Lint scripts', 
  function () {
    return gulp.src(['src/js/**/*.js', 'libs/*.js', 'gulpfile.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
  }
);

gulp.task( 'Check code style', 
  function () {
    return gulp.src('src/js/**/*.js')
      .pipe(jscs());
  }
);

gulp.task( 'Concat script modules', 
  function () {
    return gulp.src('src/js/*.js')
      .pipe(amdOptimize(requireConfig, { umd: false }))
      .pipe(concat('modules.js'))
      .pipe(gulp.dest(outDirJS));
  }
);

gulp.task( 'Concat script libraries', 
  function () {
    return gulp.src('libs/*.js')
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(outDirJS));
  }
);

gulp.task( 'Compress script module and libraries', 
  [
    'Concat script modules', 
    'Concat script libraries'
  ], 
  function() {
    return gulp.src([outDirJS + '/libs.js', outDirJS + '/modules.js'])
      .pipe(uglify())
      .pipe(concat('all.min.js'))
	  .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest(outDirJS));
  }
);

gulp.task( 'Compress all stylesheets', 
  function() {
    return gulp.src('src/css/*.css')
      .pipe(concat('all.min.css', {newLine: '\r\n'}))
      .pipe(csso())
      .pipe(gulp.dest(outDirCSS));
  }
);

gulp.task( 'Copy index.html', 
  function() {
    return gulp.src('src/index.html')
      .pipe(gulp.dest('./public'));
  }
);

gulp.task( 'Copy data directory', 
  function() {
    return gulp.src('data/*.json')
      .pipe(gulp.dest('./public/data'));
  }
);

gulp.task('default', [
  'Lint scripts',
  'Check code style',
  'Concat script modules', 
  'Concat script libraries', 
  'Compress script module and libraries',
  'Compress all stylesheets',
  'Copy index.html',
  'Copy data directory'
]);