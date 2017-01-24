var utils = require('../../utils');
var _ = require('lodash');
var gradeMasterData = require('./gradeMasterData');
module.exports = function (app) {
    app.get('/api/GradeMaster', function (req, res) {
        res.json(gradeMasterData);
    });
};