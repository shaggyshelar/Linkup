var utils = require('../utils');
var projectData = require('./projectData');
var _ = require('lodash');

var getProjects = function (req, res) {
    res.json(projectData.projectList);
};

var getTicketById = function (req, res) {
    var id = parseInt(req.params.id);
    var index = _.findIndex(ticketData.ticketList, { Id: id });
    res.json(ticketData.ticketList[index]);
};

var saveTicket = function (req, res) {
    var ticket = req.body;
    ticket.Id = ++ticketData.ids;
    ticketData.ticketList.push(ticket);
    res.json(ticket);
};

var editTicket = function (req, res) {
    var ticket = req.body;
    var index = _.findIndex(ticketData.ticketList, { Id: ticket.Id });
    ticketData.ticketList[index] = ticket
    res.json(ticket);
};

module.exports = function (app) {
    app.get('/api/project',utils.EnsureAuthenticated, getProjects);
    // app.get('/api/ticket/:id', getTicketById);
    // app.post('/api/ticket', saveTicket);
    // app.put('/api/ticket', editTicket);
};