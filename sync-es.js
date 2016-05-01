var gutil = require('gulp-util'),
  gulp = require('gulp'),
  deleteLines = require('gulp-delete-lines'),
  runSequence = require('run-sequence'),
  fs = require('fs'),
  isModule = false,
  isBabel = false,
  isReact = false,
  readEs = function readEs() {
    var i,
      length = process.argv.length;
    for (i = 0;i < length;i++ ) {
      if (process.argv[i] === '--babel') {
        isBabel = true;
      }
      if (process.argv[i] === '--module') {
        isModule = true;
      }

      if (process.argv[i] === '--react') {
        isReact = true;
      }
    }
  };
module.exports = function syncEs() {
  gulp.task('synclint-es', () => {
    readEs();
    fs.exists('./.eslintrc', (exists) => {
      if (!exists) {
        gutil.log ('please sync your npm lint package first');
        return;
      } else {
        runSequence('esReact','esBabel','esModule');
      }
    });
  });

  gulp.task('esReact',() => {
    if(!isReact) {
      return gulp.src('./.eslintrc')
      .pipe(
          deleteLines({
            filters: [
              /"react/i
            ]
          })
      )
      .pipe(gulp.dest('./'));
    }
  });

  gulp.task('esBabel',() => {
    if(!isBabel) {
      return gulp.src('./.eslintrc')
      .pipe(
          deleteLines({
            filters: [
              /"babel-eslint/i
            ]
          })
      )
      .pipe(gulp.dest('./'));
    }
  });

  gulp.task('esModule',() => {
    if(!isModule) {
      return gulp.src('./.eslintrc')
      .pipe(
          deleteLines({
            filters: [
              /"sourceType": "module"/i
            ]
          })
      )
      .pipe(gulp.dest('./'));
    }
  });
};
