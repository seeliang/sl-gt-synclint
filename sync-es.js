var gutil = require('gulp-util'),
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  deleteLines = require('gulp-delete-lines'),

  fs = require('fs'),
  notModule = true,
  notBabel = true,
  notReact = true,
  readEs = function readEs() {
    var i,
      length = process.argv.length;
    for (i = 0;i < length;i++ ) {
      if (process.argv[i] === '--babel') {
        notBabel = false;
      }
      if (process.argv[i] === '--module') {
        notModule = false;
      }

      if (process.argv[i] === '--react') {
        notReact = false;
      }
    }
  },
  esSet = function esSet() {
    gulp.src('./.eslintrc')
    .pipe(
      gulpif(
        (notBabel),
        deleteLines({
          filters: [
            /"babel-eslint"/i
          ]
        })
      )
    )
    .pipe(
      gulpif(
        (notModule),
        deleteLines({
          filters: [
            /"sourceType": "module"/i
          ]
        })
      )
    )
    .pipe(
      gulpif(
        (notReact),
        deleteLines({
          filters: [
            /"react/i
          ]
        })
      )
    )
    .pipe(gulp.dest('./'));
  };

module.exports = function syncEs() {
  gulp.task('synclint-es', () => {
    readEs();
    fs.exists('./.eslintrc', (exists) => {
      if (!exists) {
        gutil.log ('please sync your npm lint package first');
        return;
      } else {
        esSet();
      }
    });
  });
};
