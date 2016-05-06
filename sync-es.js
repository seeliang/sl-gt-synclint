var gutil = require('gulp-util'),
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  deleteLines = require('gulp-delete-lines'),
  userInput = process.argv,
  fs = require('fs'),
  notModule = true,
  notBabel = true,
  notReact = true,
  readEs = function readEs(input) {
    var i,
      length = input.length;
    for (i = 0;i < length;i++ ) {
      if (input[i] === '--babel') {
        notBabel = false;
      }
      if (input[i] === '--module') {
        notModule = false;
      }

      if (input[i] === '--react') {
        notReact = false;
      }
    }
  },
  esSet = function esSet(notBabel,notModule,notReact) {
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
    readEs(userInput);
    fs.exists('./.eslintrc', (exists) => {
      if (!exists) {
        gutil.log ('please sync your npm lint package first');
        return;
      } else {
        esSet(notBabel,notModule,notReact);
      }
    });
  });
};
