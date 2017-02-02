var utils = require('../utils');
var _ = require('lodash');
var passportData = require('./passportData');

module.exports = function (app) {
    app.get('/api/Passport', function (req, res) {
        res.json(passportData);
    });
    app.post('/api/Passport', function (req, res) {
        var passport = req.body;
        passport.ID = passportData.length + 1;
        passportData.push(passport);
        res.sendStatus(200);
    });
    app.put('/api/Passport', function (req, res) {
        var passport = req.body;
        var index = _.findIndex(passportData, { ID: passport.ID });
        passportData[index].Number = passport.Number;
        passportData[index].ExpDate = passport.ExpDate;
        res.sendStatus(200);
    });
};
