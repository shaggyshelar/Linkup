var utils = require('../../utils');
var priority = require('./../priority/priorityData');
var _ = require('lodash');

var getPriorities = function (req, res) {
  res.json(priority.priorityList);
};

module.exports = function (app) {
  app.get('/api/priorityMaster', utils.EnsureAuthenticated, getPriorities);
};
