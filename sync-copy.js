var gutil = require('gulp-util'),
  fs = require('fs'),
  gulp = require('gulp'),
  userInput = process.argv,
  length = userInput.length,
  syntaxError = function syntaxError() {
    gutil.log(
      gutil.colors.red(
        'Syntax error: Please sync with path set: $ gulp synclint --path <your lint npm package>'
      )
    );
  },
  passSyntaxCheck = function passSyntaxCheck(input) {
    var pathSet = input.indexOf('--path');
    if (!pathSet) {
      return false;
    }

    if ( pathSet < 1 ) {
      return false;
    }

    if (length < 5 ) {
      return false;
    }

    return true;
  },
  readPath =  function readPath(input) {
    var i;
    for (i = 0;i < length; i++ ) {
      if (input[i] === '--path') {
        if (!passSyntaxCheck(input) ||
          typeof input[i + 1] === 'undefined') {
          syntaxError();
          return;
        }
        return './node_modules/' + input[i + 1];
      }
    }
  };

module.exports = function copylint () {
  gulp.task('synclint-copy', () => {
    var lintFolder = readPath(userInput);
    if(passSyntaxCheck(userInput)) {
      fs.exists(lintFolder, (exists) => {
        if (exists) {
          return gulp.src([
            lintFolder + '/.*lint.yml',
            lintFolder + '/.eslintrc'
          ])
          .pipe( gulp.dest('./'));
        } else {
          gutil.log(
            gutil.colors.red(
            'Could not find local npm lint package, please make sure you installed your package'
            )
          );
          return;
        }
      });
    }
  });
};
