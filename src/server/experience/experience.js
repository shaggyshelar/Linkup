var utils = require('../utils');
var _ = require('lodash');
var experienceData = require('./experienceData');

module.exports = function (app) {
    app.get('/api/Experience', function (req, res) {
        res.json(experienceData);
    });
    app.post('/api/Experience', function (req, res) {
        var experience = req.body;
        experienceData.push({
            ID: experienceData.length + 1,
            Project: {
                Name: experience.Project,
                Manager: {
                    Name: 'Manager1'
                }
            },
            StartDate: experience.StartDate,
            EndDate: experience.EndDate,
            Client: {
                Name: experience.Client
            },
            Role: experience.Role,
            Environment: experience.Environment,
            Duration: '2 years',
            IsCurrentProject: experience.IsCurrentProject,
            Responsibilites: experience.Responsibilites,
            Description: experience.Description,
            Status: 'Pending for Approval',
            Comments: '',
            ExperienceFilePath: ''
        });
        res.sendStatus(200);
    });
    app.put('/api/Experience', function (req, res) {
        var experience = req.body;
        var index = _.findIndex(experienceData, { ID: experience.ID });
        experienceData[index].Project.Name = experience.Project;
        experienceData[index].Client.Name = experience.Client;
        experienceData[index].StartDate = experience.StartDate;
        experienceData[index].EndDate = experience.EndDate;
        experienceData[index].Role = experience.Role;
        experienceData[index].Environment = experience.Environment;
        experienceData[index].Responsibilites = experience.Responsibilites;
        experienceData[index].Description = experience.Description;
        experienceData[index].IsCurrentProject = experience.IsCurrentProject;
        res.sendStatus(200);
    });
};
