// List of hardcoded features along with their details.
var leave = require('./leave');
var leaveDetails = [{
    LeaveList: leave,
    LeaveTaken:5,
    LeaveBalance:10,
    HalfdayLeaveTaken:2,
    AbsentTaken:1,
    HalfdayAbsentTaken:1,
}];

module.exports = leaveDetails;