try {
  module.exports = require('./config.json');
} catch (err) {
  module.exports = require('./default.json');
}
