var utils = require('../../utils');
var _ = require('lodash');
var certificationMasterData = require('./certificationMasterData');
module.exports = function (app) {
    app.get('/api/CertificationMaster', function (req, res) {
        res.json(certificationMasterData);
    });
};