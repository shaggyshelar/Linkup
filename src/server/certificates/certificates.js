var utils = require('../utils');
var _ = require('lodash');
var certificateData = require('./certificateData');

module.exports = function (app) {
    app.get('/api/Certificate', function (req, res) {
        res.json(certificateData);
    });
    app.post('/api/Certificate', function (req, res) {
        var certificate = req.body;
        certificateData.push({
            ID: certificateData.length + 1,
            Name: certificate.Name,
            Code: certificate.Code,
            FromESPL: certificate.FromESPL,
            Date: certificate.Date,
            FilePath: certificate.FilePath,
            Status: 'Pending for approval',
            Comments: ''
        });
        res.sendStatus(200);
    });
    app.put('/api/Certificate', function (req, res) {
        var certificate = req.body;
        var index = _.findIndex(certificateData, { ID: certificate.ID });
        certificateData[index].Name = certificate.Name;
        certificateData[index].Code = certificate.Code;
        certificateData[index].FromESPL = certificate.FromESPL;
        certificateData[index].Date = certificate.Date;
        certificateData[index].FilePath = certificate.FilePath;
        res.sendStatus(200);
    });
};
