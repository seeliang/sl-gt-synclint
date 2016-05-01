var copy = require('./sync-copy'),
  syncEs = require('./sync-es.js');
module.exports = function synclint() {
  copy();
  syncEs();
};
