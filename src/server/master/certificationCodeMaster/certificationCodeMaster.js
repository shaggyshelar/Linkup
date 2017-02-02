var utils = require('../../utils');
var _ = require('lodash');
var certificationCodeMaster = require('./certificationCodeMasterData');
module.exports = function (app) {
    app.get('/api/CertificationCodeMaster', function (req, res) {
        res.json(certificationCodeMaster);
    });
};