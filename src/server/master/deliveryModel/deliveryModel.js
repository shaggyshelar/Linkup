var utils = require('../../utils');

var getDeliveryModel = function (req, res) {
  res.json(deliveryModel);
};

module.exports = function (app) {
  app.get('/api/deliveryModelMaster', utils.EnsureAuthenticated, getDeliveryModel);
};

var deliveryModel=[{
    ID: 1,
    Name: 'ODC Model',
  }, {
    ID: 2,
    Name: 'Project Based',
  }, {
    ID: 3,
    Name: 'Staffing',
  }, {
    ID: 4,
    Name: 'Time and Material',
  }, {
    ID: 5,
    Name: 'Others',
  }]