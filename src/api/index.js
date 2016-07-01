const USE_FIREBASE = true;
if (USE_FIREBASE) {
  module.exports = require('./fb-recipes-api');
}
else {
  module.exports = require('./fake-api');
}
