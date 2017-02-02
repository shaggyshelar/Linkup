var utils = require('./utils');
var users = require('./userData');
var _ = require('lodash');

module.exports = function (app) {
    app.post('/api/Auth', function (req, res) {
        var userName = req.body.UserName;
        var password = req.body.Password;
        var userIndex = _.findIndex(users, { UserName: userName, Password: password });
        if (userIndex != '-1') {
            var token = utils.CreateJWT(users[userIndex]);
            res.send({ token: token });
        } else {
            res.status(401).json({error:'Invalid userName Password.'});
        }
    });
    app.delete('/api/Auth', utils.EnsureAuthenticated, function (req, res) {
        res.sendStatus(200);
    });
    app.get('/api/Auth', utils.EnsureAuthenticated, function (req, res) {
        var userIndex = _.findIndex(users, { Id: req.userID });
        res.json(users[userIndex].Permissions);
    });
    
    app.get('/api/GetLoggedInUserPermission', utils.EnsureAuthenticated, function (req, res) {
        var userIndex = _.findIndex(users, { Id: req.userID });
        res.json(users[userIndex].Permissions);
    });

    app.get('/api/getHolidays', function (req, res) {
        res.json([
            { id: '1111', date: '11/11/1111', title: 'Laxmi Puja', type: 'Fixed' },
            { id: '2222', date: '22/22/1111', title: 'Bhai Duj', type: 'Floating' },
            { id: '3333', date: '33/33/1111', title: 'Christmas', type: 'Fixed' },
            { id: '4444', date: '44/44/1111', title: 'New Year', type: 'Floating' },
        ]);
    });

    app.get('/api/getTimesheets', function (req, res) {
        res.json([
            { id: '11111', date: '11/11/1111', billableHours: '11:11', nonBillableHours: '12:12', name: 'Records 1' },
            { id: '22222', date: '22/11/1111', billableHours: '22:11', nonBillableHours: '22:12', name: 'Records 1' },
            { id: '3333', date: '33/11/1111', billableHours: '33:11', nonBillableHours: '33:12', name: 'Records 1' },
            { id: '4444', date: '44/11/1111', billableHours: '44:11', nonBillableHours: '44:12', name: 'Records 1' },
        ]);
    });
};
