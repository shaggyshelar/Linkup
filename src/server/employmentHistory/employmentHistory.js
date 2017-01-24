var utils = require('../utils');
var _ = require('lodash');
var employmentHistoryData = require('./employmentHistoryData');

module.exports = function (app) {
    app.get('/api/EmploymentHistory', function (req, res) {
        res.json(employmentHistoryData);
    });
    app.post('/api/EmploymentHistory', function (req, res) {
        var employmentHistory = req.body;
        employmentHistoryData.push({
            ID: employmentHistoryData.length + 1,
            EmploymentDetail: employmentHistory.EmploymentDetail,
            Designation: employmentHistory.Designation,
            StartDate: employmentHistory.StartDate,
            EndDate: employmentHistory.EndDate
        });
        res.sendStatus(200);
    });
    app.put('/api/EmploymentHistory', function (req, res) {
        var employmentHistory = req.body;
        var index = _.findIndex(employmentHistoryData, { ID: employmentHistory.ID });
        employmentHistoryData[index].EmploymentDetail = employmentHistory.EmploymentDetail;
        employmentHistoryData[index].Designation = employmentHistory.Designation;
        employmentHistoryData[index].StartDate = employmentHistory.StartDate;
        employmentHistoryData[index].EndDate = employmentHistory.EndDate;
        res.sendStatus(200);
    });
};
