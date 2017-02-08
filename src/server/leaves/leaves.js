var utils = require('../utils');
var user = require('./userData');
var leaveDetails = require('./leaveDetail');
var leave = require('./leave');
var _ = require('lodash');

module.exports = function(app) {

   app.get('/api/Leave/myleaves', function(req, res) {
        res.json(leave);
    });
    app.get('/api/Leave/ApproverLeaves', function(req, res) {
        res.json(leave);
    });
    app.put('/api/LeaveApprovers/ApproveByManage', function(req, res) {
        res.json(req.body);
    });
    app.put('/api/LeaveApprovers/BulkLeaveApproval', function(req, res) {
        res.json(req.body);
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
     app.get('/api/LeaveDetails/:id', function(req, res) {
        var id = req.params.id;
        for (var index in leave) {
            if (leave[index].LeaveRequestMasterId == id) {
                res.json([leave[index]]);
                return;
            }
        }
    });
     app.get('/api/LeaveApprovers/:id', function(req, res) {
        var id = req.params.id;
        var ApproverList=[
            {
                Approver: { Name: 'Sagar Shelar'},
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comments: 'Approved'
            }
        ];
        res.json(ApproverList);
    });
     app.get('/api/Project/GetMyActiveProjects', function(req, res) {
        var Project=[
            {
                ProjectManager: { Name: 'Sagar Shelar'},
                Title: 'HRMS',
            }
        ];
        res.json(Project);
    });
    app.post('/api/LeaveDetails', function(req, res) {
        if (req.body != null) {
            req.body.ID = leave.length + 1;
            req.body.Status = 'Pending';
            leave.push(req.body);
            res.json({});
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

    app.delete('/api/Leave/cancel', function(req, res) {
        res.sendStatus(200);
    });

    app.get('/api/EmployeeLeaves/GetMyLeaveDetails', function(req, res) {
        res.json(leaveDetails);
    });


    app.get('/api/Users/', function(req, res) {
        res.json(user);
    });

}
