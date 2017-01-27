var utils = require('../../utils');

var getPriceType = function (req, res) {
  res.json(priceType);
};

module.exports = function (app) {
  app.get('/api/priceTypeMaster', utils.EnsureAuthenticated, getPriceType);
};

var priceType=[{
    ID: 1,
    Name: 'Cost Plus',
  }, {
    ID: 2,
    Name: 'Fixed',
  }, {
    ID: 3,
    Name: 'Staffing',
  }, {
    ID: 4,
    Name: 'Hourly',
  }, {
    ID: 5,
    Name: 'Monthly',
  }, {
    ID: 6,
    Name: 'T & M',
  }]