var utils = require('../utils');
var _ = require('lodash');
var achievementData = require('./achievementData');

module.exports = function (app) {
    app.get('/api/Achievement', function (req, res) {
        res.json(achievementData);
    });
    app.post('/api/Achievement', function (req, res) {
        var achievement = req.body;
        achievement.ID = achievementData.length + 1;
        achievementData.push(achievement);
        res.sendStatus(200);
    });
    app.put('/api/Achievement', function (req, res) {
        var achievement = req.body;
        var index = _.findIndex(achievementData, { ID: achievement.ID });
        achievementData[index] = achievement;
        res.sendStatus(200);
    });
};
