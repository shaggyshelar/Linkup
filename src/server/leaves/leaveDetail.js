// List of hardcoded features along with their details.
var leave = require('./leave');
var leaveDetails = {
    LeaveList: leave,
    LeaveTaken:5,
    LeaveBalance:10,
    HalfdayLeaveTaken:2,
    AbsentTaken:1,
    HalfdayAbsentTaken:1,
    ActualBalance:7,
    MarriageLeaveTaken:1,
    PaternityLeaveTaken:1,
    MaternityLeaveTaken:40,
};

module.exports = leaveDetails;