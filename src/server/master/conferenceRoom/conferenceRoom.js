var utils = require('../../utils');
var room = require('./../conferenceRoom/conferenceRoomData');
var _ = require('lodash');

var getRooms = function (req, res) {
  res.json(room.roomList);
};

module.exports = function (app) {
  app.get('/api/conferenceRoomMaster', utils.EnsureAuthenticated, getRooms);
};
