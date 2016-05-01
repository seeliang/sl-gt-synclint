//pipe if
//support short code -p
var copy = require('./sync-copy').copy,
  syncEs = require('./sync-es.js');
module.exports = function synclint() {
  copy();
  syncEs();
};
