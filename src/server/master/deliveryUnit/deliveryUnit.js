var utils = require('../../utils');

var getDeliveryUnit = function (req, res) {
  res.json(deliveryUnit);
};

module.exports = function (app) {
  app.get('/api/deliveryUnitMaster', utils.EnsureAuthenticated, getDeliveryUnit);
};

var deliveryUnit=[{
    ID: 1,
    Name: 'Microsoft',
  }, {
    ID: 2,
    Name: 'Operations',
  }, {
    ID: 3,
    Name: 'Salesforce',
  }]