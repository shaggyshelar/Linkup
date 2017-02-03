// List of hardcoded features along with their details.
var leaveType = require('./leaveType');
var leave = [
    {
        ID: 6527,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[2],
        StartDate: new Date('12/12/2016 00:00:00'),
        EndDate: new Date('12/12/2016 00:00:00'),
        NumberOfLeave: 1,
        Comment: 'Granted',
        Status: 'Approved',
        Reason: 'Going home',
        Approvers: [
            {
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    },
    {
        ID: 6137,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[2],
        StartDate: new Date('2/1/2017 00:00:00'),
        EndDate: new Date('3/1/2017 00:00:00'),
        NumberOfLeave: 2,
        Comment: 'Granted',
        Status: 'Partially Approved',
        Reason: 'holiday',
        Approvers: [
            {
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    },
    {
        ID: 6522,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[0],
        StartDate: new Date('12/09/2016 00:00:00'),
        EndDate: new Date('12/09/2016 00:00:00'),
        NumberOfLeave: 1,
        Comment: 'Granted',
        Status: 'Approved',
        Reason: 'Birthday',
        Approvers: [
            {
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    },
    {
        ID: 6524,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[3],
        StartDate: new Date('12/12/2016 00:00:00'),
        EndDate: new Date('12/12/2016 00:00:00'),
        NumberOfLeave: 0.5,
        Comment: '',
        Status: '',
        Reason: 'Personal',
        Approvers: [
            {
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    },
    {
        ID: 6000,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[3],
        StartDate: new Date('12/1/2016 00:00:00'),
        EndDate: new Date('12/1/2016 00:00:00'),
        NumberOfLeave: 0.5,
        Comment: 'Approved',
        Status: 'Approved',
        Reason: 'Personal',
        Approvers: [
            {
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    }
];

module.exports = leave;
