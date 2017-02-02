var utils = require('../../utils');

var getProjectCategory = function (req, res) {
  res.json(projectCategory);
};

module.exports = function (app) {
  app.get('/api/projectCategoryMaster', utils.EnsureAuthenticated, getProjectCategory);
};

var projectCategory=[{
    ID: 1,
    Name: 'Adm - Employee Leave',
  }, {
    ID: 2,
    Name: 'Bench',
  }, {
    ID: 3,
    Name: 'Corp - Financial Accounting and Administration',
  }, {
    ID: 4,
    Name: 'Corp - HCD Operations',
  }, {
    ID: 5,
    Name: 'Corp - HR Operations',
  }, {
    ID: 6,
    Name: 'Delv - CoE (MSPlus)',
  }, {
    ID: 7,
    Name: 'Delv - Projects (SFDC)',
  }]