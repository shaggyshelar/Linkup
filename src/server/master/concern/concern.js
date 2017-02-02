var utils = require('../../utils');
var concern = require('./../concern/concernData');
var _ = require('lodash');

var getRooms = function (req, res) {
  res.json(concern.concernList);
};

module.exports = function (app) {
  app.get('/api/concernMaster', utils.EnsureAuthenticated, getRooms);
};
