var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename')
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');


gulp.task('process-styles', function() {
  // setting a source document:
    return sass('src/styles/main.scss')
      .pipe(autoprefixer('last 2 version'))
      // using node's streams to process these files....?
      .pipe(gulp.dest('dest/styles/')) // refs current directory
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest('dest/styles/'))
  });

  gulp.task('process-scripts', function() {
    return gulp.src('src/scripts/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dest/scripts/'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('dest/scripts/'))
  });

// Watches for any changes in JS files:
gulp.task('watch', function() {
    gulp.watch('src/scripts/*.js', ['process-scripts'])
  });

gulp.task('default', function() {
  // string literal (name of the task) + the function of the task
  console.log("GULP WORKING");
});
