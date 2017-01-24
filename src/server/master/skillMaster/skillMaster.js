var utils = require('../../utils');
var _ = require('lodash');
var skillMasterData = require('./skillMasterData');
module.exports = function (app) {
    app.get('/api/skillMaster', function (req, res) {
        res.json(skillMasterData);
    });
};