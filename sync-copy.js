var gutil = require('gulp-util'),
  fs = require('fs'),
  gulp = require('gulp'),
  length = process.argv.length,
  syntaxError = function syntaxError() {
    gutil.log(
      gutil.colors.red(
        'Syntax error: Please sync with path set: $ gulp synclint --path <your lint npm package>'
      )
    );
  },
  passSyntaxCheck = function passSyntaxCheck() {
    var pathSet = process.argv.indexOf('--path');
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
  readPath =  function readPath() {
    var i;
    for (i = 0;i < length; i++ ) {
      if (process.argv[i] === '--path') {
        if (!passSyntaxCheck() ||
          typeof process.argv[i + 1] === 'undefined') {
          syntaxError();
          return;
        }
        return './node_modules/' + process.argv[i + 1];
      }
    }
  };

module.exports = {
  copy: () => {
    gulp.task('synclint-copy', () => {
      var lintFolder = readPath();
      if(passSyntaxCheck()) {
        fs.exists(lintFolder, (exists) => {
          if (exists) {
            return gulp.src([
              lintFolder + '/.scss-lint.yml',
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
  }
};
