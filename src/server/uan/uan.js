var utils = require('../utils');
var _ = require('lodash');
var uanData = require('./uanData');

module.exports = function (app) {
    app.get('/api/Uan', function (req, res) {
        res.json(uanData);
    });
    app.post('/api/Uan', function (req, res) {
        var uan = req.body;
        uan.ID = uanData.length + 1;
        uanData.push(uan);
        res.sendStatus(200);
    });
    app.put('/api/Uan', function (req, res) {
        var uan = req.body;
        var index = _.findIndex(uanData, { ID: uan.ID });
        uanData[index] = uan;
        res.sendStatus(200);
    });
};
