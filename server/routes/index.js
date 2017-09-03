
var path = require('path');

module.exports = function(app) {
  app.use('/user', require('../api/user'));
  app.use('/api', require('../api/landscape'));
  app.use('/api', require('../api/map'));
  app.use('/api', require('../api/favourites'));
};
