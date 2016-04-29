//pipe if
//support short code -p
'use strict';
let gutil = require('gulp-util'),
  runSequence = require('run-sequence'),
  deleteLines = require('gulp-delete-lines');
module.exports = function synclint(gulp) {
  let pathSet = process.argv.indexOf('--path'),
    isModule = false,
    isBabel = false,
    isReact = false,
    lintFolder,
    i,
    length = process.argv.length,
    fs = require('fs');

  // read path
  function readPath() {
    for (i = 0;i < length; i++ ) {
      if (process.argv[i] === '--path') {
        if (process.argv[i + 1].startsWith('--')) {
          pathSyntax();
          return;
        }
        lintFolder = './node_modules/' + process.argv[i + 1];
      }
    }
  }

  // read es set
  function readEs() {
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
  }

  function readSet() {
    readEs();
    readPath();
  }

  function pathSyntax() {
    gutil.log(
      gutil.colors.red(
        'Syntax error: Please sync with path set: $ gulp synclint --path <your lint npm package>'
      )
    );
  }




  readSet();

  gulp.task('synclint',() => {
    runSequence('synclint-copy','synclint-es');
  });

  gulp.task('synclint-copy', () => {

    if ( pathSet < 1 ) {
      pathSyntax();
      return;
    }

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

  });

  gulp.task('synclint-es', () => {
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
