var utils = require('../utils');
var _ = require('lodash');
var educationData = require('./educationData');

module.exports = function (app) {
    app.get('/api/Education', function (req, res) {
        res.json(educationData);
    });
    app.post('/api/Education', function (req, res) {
        var education = req.body;
        educationData.push({
            ID: educationData.length + 1,
            Class: {
                Name: education.Name
            },
            Degree: education.Degree,
            Grade: education.Grade,
            Percentage: education.Percentage,
            YearOfPassing: education.YearOfPassing
        });
        res.sendStatus(200);
    });
    app.put('/api/Education', function (req, res) {
        var education = req.body;
        var index = _.findIndex(educationData, { ID: education.ID });
        educationData[index].Class.Name = education.Name;
        educationData[index].Degree = education.Degree;
        educationData[index].Grade = education.Grade;
        educationData[index].Percentage = education.Percentage;
        educationData[index].YearOfPassing = education.YearOfPassing;
        res.sendStatus(200);
    });
};
