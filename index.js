//with bebal with react
// gulp replace
'use strict';
var gutil = require('gulp-util');
module.exports = function(gulp) {
  gulp.task('synclint', function() {
    var index = process.argv.indexOf('--path'),
      lintFolder = './node_modules/' + process.argv[4],
      length = process.argv.length,
      fs = require('fs');
    if (index < 1 || length !== 5) {
      gutil.log(
        gutil.colors.red(
          'Syntax error: Please set path with $ synclint --path <your lint npm package>'
        )
      );
      return;
    }

    fs.exists(lintFolder, (exists) => {
      if (exists) {
        gulp.src([
          lintFolder + '/.scss-lint.yml',
          lintFolder + '/.eslintrc'
        ])
        .pipe( gulp.dest('./') )
        .on('end', function(){
          gutil.log('You just updated your lint from ' + lintFolder);
        });
      } else {
        gutil.log(
          gutil.colors.red(
          'Could not find package, please make sure you installed your lint npm package'
          )
        );
      }
    });

  });
};
