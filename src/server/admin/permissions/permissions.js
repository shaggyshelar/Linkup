// Return current user's permissions array
var utils = require('../../utils');
var permissions = require('./../permissions/permissionsData');
var roles = require('./../roles/rolesData');
var _ = require('lodash');

var getLoggedInUserPermission = function (req, res) {
  var userIndex = _.findIndex(permissions.userPermission, {
    userId: req.userID
  });
  res.json(permissions.userPermission[userIndex].Permissions);
};

var getAllPermissions = function (req, res) {
  res.json(permissions.permissionsList);
};

var getPermissionsByRole = function (req, res) {
    var roleId = parseInt(req.params.id);
    var index = _.findIndex(roles.roleList, { ID: roleId });
    res.json(roles.roleList[index].Permissions);
};
var addPermissionToRole = function (req, res) {
    var permission = req.body;
    var index = _.findIndex(roles.roleList, { ID: parseInt(permission.RoleId) });
    roles.roleList[index].Permissions.push(permission);
    res.json(permission);
};
var revokePermissionFromRole = function (req, res) {
    var permission = req.body;
    var roleindex = _.findIndex(roles.roleList, { ID: parseInt(permission.RoleId) });
    var permissionindex = _.findIndex(roles.roleList[roleindex].Permissions, { Text: permission.text });
    roles.roleList[roleindex].Permissions.splice(permissionindex, 1);
    res.json(permission);
};

module.exports = function (app) {
  app.get('/api/permission', utils.EnsureAuthenticated, getAllPermissions);
  app.get('/api/permission/:id', utils.EnsureAuthenticated, getPermissionsByRole);
  app.post('/api/permission', utils.EnsureAuthenticated, addPermissionToRole);
  app.put('/api/permission', utils.EnsureAuthenticated, revokePermissionFromRole);
};
