var utils = require('../../utils');
var ticketData = require('./ticketData');
var _ = require('lodash');

var getTicket = function (req, res) {
    res.json(ticketData.ticketList);
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
    app.get('/api/Ticket', getTicket);
    app.get('/api/Ticket/:id', getTicketById);
    app.post('/api/Ticket', saveTicket);
    app.put('/api/Ticket', editTicket);
};