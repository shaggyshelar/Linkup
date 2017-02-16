var utils = require('../utils');
var holidays = require('./holidayData');
var _ = require('lodash');

module.exports = function (app) {
    app.get('/api/Holiday/:id', function (req, res) {
        res.json(holidays);
    });
    app.get('/api/Holiday', function (req, res) {
        res.json(holidays);
    });
}