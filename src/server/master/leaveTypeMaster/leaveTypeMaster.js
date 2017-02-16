var utils = require('../../utils');
var _ = require('lodash');
var leaveTypes = require ('./leaveTypeMasterData');

module.exports = function(app) {

    app.get('/api/LeaveType',utils.EnsureAuthenticated, function(req, res) {
        res.json(leaveTypes);
    });

}