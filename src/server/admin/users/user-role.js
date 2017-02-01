var utils = require('../../utils');
var users = require('./../users/userData');
var _ = require('lodash');

var getUserRole = function (req, res) {
    var userId = parseInt(req.params.id);
    var index = _.findIndex(users, { ID: userId });
    res.json(users[index]);
};

var getUsers = function (req, res) {
    res.json(users);
};

var addRole = function (req, res) {
    var role = req.body;
    var index = _.findIndex(users, { ID: parseInt(role.UserId) });
    users[index].Roles.push(role);
    res.json(role);
};

var revokeRole = function (req, res) {
    var role = req.body;
    var userIndex = _.findIndex(users, { ID: parseInt(role.userId) });
    var roleIndex= _.findIndex(users[userIndex].Roles, {ID: parseInt(role.ID) });
    users[userIndex].Roles.splice(roleIndex,1);
    res.json(role);
};


module.exports = function (app) {
    app.get('/api/UserRole/:id', utils.EnsureAuthenticated, getUserRole);
    app.post('/api/UserRole', utils.EnsureAuthenticated, addRole);
    app.put('/api/UserRole', utils.EnsureAuthenticated, revokeRole);
};
