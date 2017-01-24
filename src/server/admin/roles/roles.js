var utils = require('../../utils');
var roles = require('./../roles/rolesData');
var _ = require('lodash');

var getRoles = function (req, res) {
  res.json(roles.roleList);
};

var addRole = function (req, res) {
  var role = req.body;
  role.ID = ++roles.ids;
  role.Permissions = [];
  roles.roleList.push(role);
  res.json(role);
};

var deleteRole = function (req, res) {
  var roleId = parseInt(req.params.id);
  var index = _.findIndex(roles.roleList, {
    ID: roleId
  });
  roles.roleList.splice(index, 1)
  res.sendStatus(200);
};

var getRoleById = function (req, res) {
  var roleID = parseInt(req.params.id);
  var index = _.findIndex(roles.roleList, {
    ID: roleID
  });
  res.json(roles.roleList[index]);
};

var editRole = function (req, res) {
  var role = req.body;
  var index = _.findIndex(roles.roleList, {
    ID: role.ID
  });
  roles.roleList[index] = role
  res.json(role);
};

module.exports = function (app) {
  app.get('/api/role', getRoles);
  app.get('/api/role/:id', getRoleById);
  app.post('/api/role', addRole);
  app.delete('/api/role/:id', deleteRole);
  app.put('/api/role', editRole);
};
