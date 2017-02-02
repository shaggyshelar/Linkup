var utils = require('../utils');
var _ = require('lodash');
var nomineesData = require('./nomineesData');

module.exports = function (app) {
    app.get('/api/Nominee', function (req, res) {
        res.json(nomineesData);
    });
    app.post('/api/Nominee', function (req, res) {
        var nominees = req.body;
        nominees.ID = nomineesData.length + 1;
        nomineesData.push(nominees);
        res.sendStatus(200);
    });
    app.put('/api/Nominee', function (req, res) {
        var nominees = req.body;
        var index = _.findIndex(nomineesData, { ID: nominees.ID });
        nomineesData[index] = nominees;
        res.sendStatus(200);
    });
};
