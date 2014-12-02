'use strict';

//var codepaint = require('codepainter');
//var concat = require('gulp-concat');
//var debug = require('debug')('gulp');
var del = require('del');
//var filter = require('gulp-filter');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var revall = require('gulp-rev-all');
var shell = require('gulp-shell');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

gulp.task('dev', function () {
  nodemon(
    {
      script: 'app.js',
      ext: 'html js',
      env: {'NODE_ENV': 'development', 'DEBUG': 'app,controller,model'}
    }
  )
    .on('restart', function () {
      console.log('restarted');
    });
});

gulp.task('default', function () {
  gutil.log('... ' + gutil.colors.cyan('happy coding ..'));
});

gulp.task('format:js', function () {
  gulp.src(['*.js', 'app/**/*.js', 'config/**/*.js'], {read: false})
    .pipe(shell([
      'echo <%= file.path %>',
      'codepaint xform -e <%= file.path %>'
    ]));
});

gulp.task('hint:js', function () {
  return gulp.src(['*.js', 'app/**/*.js', 'config/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('style:prepare', ['clean'], function () {
  gulp.src('public/bower_components/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('public/stylesheets/fonts'));

  return gulp.src('public/bower_components/bootstrap/**')
    .pipe(gulp.dest('build/bootstrap/'))
    .on('end', function () {
      gulp.src('public/stylesheets/less/**')
        .pipe(gulp.dest('build/bootstrap/less/'));
    });
});

gulp.task('style:compile', function () {
  return gulp.src('build/bootstrap/less/bootstrap.less')
    .pipe(less())
    //.pipe(minifyCSS())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('template', ['clean'], function () {
  var assets = useref.assets();

  return gulp.src('app/views/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    //.pipe(gulpif('*.js', {cwd: config.root}))
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build/'));
});

gulp.task('versioning', ['template'], function () {
  return gulp.src('build/**')
    .pipe(revall(
      {
        ignore: ['.html']
      }
    ))
    .pipe(gulp.dest('dist/app/views/'));
});

gulp.task('dist', ['versioning'], function (cb) {
  gulp.src('app/controllers/**')
    .pipe(gulp.dest('dist/app/controllers/'));

  gulp.src('app/models/**')
    .pipe(gulp.dest('dist/app/models/'));

  gulp.src('app/data/**')
    .pipe(gulp.dest('dist/app/data/'));

  gulp.src('dist/app/views/public/js/**')
    .pipe(gulp.dest('dist/public/js/'));

  gulp.src('dist/app/views/public/css/**')
    .pipe(gulp.dest('dist/public/css/'));

  gulp.src('public/images/**')
    .pipe(gulp.dest('dist/public/images/'));

  gulp.src('public/stylesheets/fonts/**')
    .pipe(gulp.dest('dist/public/css/fonts/'));

  gulp.src('config/**')
    .pipe(gulp.dest('dist/config'));

  gulp.src(['package.json', '*.js', '*.md'])
    .pipe(gulp.dest('dist'));

  del(['dist/app/views/public/**', 'build/**'], cb);
});

gulp.task('clean', function (cb) {
  del(['dist/**', 'build/**'], cb);
});
