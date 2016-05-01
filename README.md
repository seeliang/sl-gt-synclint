# gulp task for sync lint set
[Sample]('https://github.com/seeliang/sl-gt-synclint')
## Usage

`npm install sl-gt-synclint`

in your gulpfile.js

`require('sl-gt-synclint')(gulp);`

### Sync
`gulp synclint-copy --path <your lint set npm name>`
### Sync Options
`gulp synclint-es --module`
#### --module
keep module set "sourceType": "module"

`gulp synclint-es --module`
#### --react
keep react set: rules start with "react"

`gulp synclint-es --react`

#### --babel
keep babel set  "babel-eslint"

`gulp synclint-es --babel`

## Reference

[Modularizing gulp tasks]('http://lfender6445.github.io/modularizing-gulp-tasks/')

## Special thanks
[gulp-if]('https://github.com/robrich/gulp-if') by robich
