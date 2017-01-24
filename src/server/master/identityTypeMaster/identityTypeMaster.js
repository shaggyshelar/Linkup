var utils = require('../../utils');
var _ = require('lodash');
var identityTypeMasterData = require('./identityTypeMasterData');
module.exports = function (app) {
    app.get('/api/IdentityTypeMaster', function (req, res) {
        res.json(identityTypeMasterData);
    });
};