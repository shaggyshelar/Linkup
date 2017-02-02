var utils = require('../utils');
var _ = require('lodash');
var addressData = require('./addressData');

module.exports = function (app) {
    app.get('/api/Address', function (req, res) {
        res.json(addressData);
    });
    app.post('/api/Address', function (req, res) {
        var address = req.body;
        if (address) {
            var currentindex = _.findIndex(address, { Type: 'Current' });
            addressData.push({
                ID: addressData.length + 1,
                Type: address[currentindex].Type,
                Description: address[currentindex].Description
            });
            var permanentindex = _.findIndex(address, { Type: 'Permanent' });
            addressData.push({
                ID: addressData.length + 1,
                Type: address[permanentindex].Type,
                Description: address[permanentindex].Description
            });
        }
        res.sendStatus(200);
    });
    app.put('/api/Address', function (req, res) {
        var address = req.body;
        for (var index = 0; index < address.length; index++) {
            var addressIndex = _.findIndex(addressData, { ID: address[index].ID })
            addressData[addressIndex].Description = address[addressIndex].Description
        }
        res.sendStatus(200);
    });
};
