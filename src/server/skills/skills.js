var utils = require('../utils');
var _ = require('lodash');
var skillData = require('./skillsData');

module.exports = function(app) {
    app.get('/api/Skill', function(req, res) {
        res.json(skillData);
    });
    app.post('/api/Skill', function(req, res) {
        var skill = req.body;
        skillData.push({
            ID: skillData.length + 1,
            Name: skill.Name,
            Type: {
                Name: skill.Type
            },
            Status: 'Pending for approval',
            Comments: ''
        });
        res.sendStatus(200);
    });
    app.put('/api/Skill', function(req, res) {
        var skill = req.body;
        var index = _.findIndex(skillData, { ID: skill.ID });
        skillData[index].Name = skill.Name;
        skillData[index].Type.Name = skill.Type;
        res.sendStatus(200);
    });
};
