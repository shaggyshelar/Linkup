var utils = require('../../utils');
var department = require('./../department/departmentData');
var _ = require('lodash');

var getDepartments = function (req, res) {
  res.json(department.departmentList);
};

module.exports = function (app) {
  app.get('/api/departmentMaster', utils.EnsureAuthenticated, getDepartments);
};
