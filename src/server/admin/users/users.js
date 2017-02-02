var utils = require('../../utils');
var users = require('./../users/userData');
var _ = require('lodash');

var getUsers = function (req, res) {
  res.json(users);
};

var addUser = function (req, res) {
  var user = req.body;
  user.ID = ++users.ids;
  users.userList.push(user);
  res.json(user);
};

var deleteUser = function (req, res) {
  var userId = parseInt(req.params.id);
  var index = _.findIndex(users.userList, {
    ID: userId
  });
  users.userList.splice(index, 1)
  res.sendStatus(200);
};

var getUserById = function (req, res) {
  var userID = parseInt(req.params.id);
  var index = _.findIndex(users.userList, {
    ID: userID
  });
  res.json(users.userList[index]);
};

var editUser = function (req, res) {
  var user = req.body;
  var index = _.findIndex(users.userList, {
    ID: user.ID
  });
  users.userList[index] = user
  res.json(user);
};

module.exports = function (app) {
  app.get('/api/User', getUsers);
  app.get('/api/User/:id', getUserById);
  app.post('/api/User', addUser);
  app.delete('/api/User/:id', deleteUser);
  app.put('/api/User', editUser);
};
