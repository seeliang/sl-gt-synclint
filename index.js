module.exports = function(gulp) {
  gulp.task('synclint', function() {
    var index = process.argv.indexOf("--path"),
      lintFolder = './node_modules/' + process.argv[4],
      length = process.argv.length,
      fs = require('fs');
    if (index < 1 || length !== 5) {
      console.log(
        '\n' +
        'Syntax error: Please set path with $ synclint --path <your lint set npm name>' +
        '\n'
      );
    }

    fs.exists(lintFolder, (exists) => {
      if (exists) {
        gulp.src([
          lintFolder + '/.scss-lint.yml',
          lintFolder + '/.eslintrc'
        ])
        .pipe( gulp.dest('./') );
      } else {
        console.log(
          '\n' +
          'Could not find package, please check your lint dependency' +
          '\n'
        );
      }
    });

  });
}
