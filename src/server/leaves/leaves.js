var utils = require('../utils');
var user = require('./userData');
var leaveDetails = require('./leaveDetail');
var leave = require('./leave');
var _ = require('lodash');

module.exports = function(app) {

   app.get('/api/Leave/myleaves', function(req, res) {
        res.json(leave);
    });
    app.get('/api/Leave/:id', function(req, res) {
        var id = req.params.id;
        for (var index in leave) {
            if (leave[index].ID == id) {
                res.json(leave[index]);
                return;
            }
        }
    });

   
   
    app.post('/api/Leave', function(req, res) {
        if (req.body != null) {
            req.body.ID = leave.length + 1;
            req.body.Status = 'Pending';
            leave.push(req.body);
            res.sendStatus(201);
        } else {
            res.sendSatus(500).end('Bad Request.');
        }
    });

    app.put('/api/Leave', function(req, res) {
        if (req.body != null && req.body.length > 0) {
            var i;
            var reqBdy = req.body;
            for (i = 0; i < reqBdy.length; i++) {
                var leaveParams = reqBdy[i];
                var index = _.findIndex(leave, { ID: leaveParams.ID });
                leave[index].Comment = leaveParams.Comment;
                leave[index].Status = leaveParams.Status;
            }
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500).end('Bad Request.');
        }
    });

    app.delete('/api/Leave/:id', function(req, res) {
        var leaveParamID = parseInt(req.params.id);
        if (leaveParamID > -1) {
            var index = _.findIndex(leave, {
                ID: leaveParamID
            });
            leave.splice(index, 1);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500).end('Bad Request');
        }
    });

    app.get('/api/Users/LeaveDetails', function(req, res) {
        res.json(leaveDetails);
    });


    app.get('/api/Users/', function(req, res) {
        res.json(user);
    });

}
