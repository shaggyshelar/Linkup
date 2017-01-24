var utils = require('../utils');
var _ = require('lodash');
var profileData = require('./profileData');

module.exports = function (app) {
    app.get('/api/profile/:id', function (req, res) {
        var id = req.params.id;
        for (var index in profileData) {
            if (profileData[index].ID == id) {
                res.json(profileData[index]);
                return;
            }
        }
    })
};
