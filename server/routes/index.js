
var path = require('path');

module.exports = function(app) {
  app.use('/user', require('../api/user'));
  // app.use('/project', require('../api/project'));
  // app.use('/comment', require('../api/comment'));
  // app.use('/messages', require('../api/message'));
  // app.use('/relations', require('../api/project-user-rel'));
};
