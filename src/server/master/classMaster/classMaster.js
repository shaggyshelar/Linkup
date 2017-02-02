var utils = require('../../utils');
var _ = require('lodash');
var classMasterData = require('./classMasterData');
module.exports = function (app) {
    app.get('/api/ClassMaster', function (req, res) {
        res.json(classMasterData);
    });
};