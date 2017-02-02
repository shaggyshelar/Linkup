var utils = require('../../utils');

var getProjectType = function (req, res) {
  res.json(projectType);
};

module.exports = function (app) {
  app.get('/api/projectTypeMaster', utils.EnsureAuthenticated, getProjectType);
};

var projectType=[{
    ID: 1,
    Name: 'Administration',
  }, {
    ID: 2,
    Name: 'External',
  }, {
    ID: 3,
    Name: 'Internal',
  }]