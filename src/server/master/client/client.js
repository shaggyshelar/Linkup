var utils = require('../../utils');
var client = require('./../client/clientData');

var getClient = function (req, res) {
  res.json(client.clientList);
};

module.exports = function (app) {
  app.get('/api/clientMaster', utils.EnsureAuthenticated, getClient);
};
