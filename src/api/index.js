const USE_FIREBASE = false;
if (USE_FIREBASE) {
  module.exports = require('./fb-recipes-api');
}
else {
  module.exports = require('./fake-api');
}
