// List of hardcoded features along with their details.
var leaveType = require('./leaveType');
var leave = [
    {
        ID: 6527,
        LeaveRequestMasterId:1,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[2],
        StartDate: new Date('12/12/2016 00:00:00'),
        EndDate: new Date('12/12/2016 00:00:00'),
        NumberOfDays: 1,
        Comment: 'Granted',
        Status: 'Approved',
        Reason: 'Going home',
        EmpID:1023,
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
        LeaveRequestMasterId:2,
        ID: 6137,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        EmpID:1025,
        Type: leaveType[2],
        StartDate: new Date('2/1/2017 00:00:00'),
        EndDate: new Date('3/1/2017 00:00:00'),
        NumberOfDays: 2,
        Comment: 'Granted',
        Status: 'Partially Approved',
        Reason: 'holiday',
        Approvers: [
            {
                Name: 'Sagar Shelar',
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Sagar Shelar',
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Sagar Shelar',
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    },
    {
        LeaveRequestMasterId:3,
        ID: 6522,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        Type: leaveType[0],
        EmpID:1027,
        StartDate: new Date('12/09/2016 00:00:00'),
        EndDate: new Date('12/09/2016 00:00:00'),
        NumberOfDays: 1,
        Comment: 'Granted',
        Status: 'Approved',
        Reason: 'Birthday',
        Approvers: [
            {
                Name: 'Sagar Shelar',
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Kunal Adhikari',
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Pooja Merchant',
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ]
    },
    {
        ID: 6524,
        LeaveRequestMasterId:4,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        EmpID:1020,
        Type: leaveType[3],
        StartDate: new Date('12/12/2016 00:00:00'),
        EndDate: new Date('12/12/2016 00:00:00'),
        NumberOfDays: 0.5,
        Comment: '',
        Status: '',
        Reason: 'Personal',
        Approvers: [
              {
                Name: 'Sagar Shelar',
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Kunal Adhikari',
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Pooja Merchant',
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            },
        ],
        PendingApprovers:[
             {
                Name: 'Sagar Shelar',
            },
            {
                Name: 'Pooja Merchant',
            }
        ]
    },
    {
        ID: 6000,
        LeaveRequestMasterId:5,
        Employee: {
            ID: 12345,
            Name: 'FName Lname',
            Department: 'EBS'
        },
        EmpID:10222,
        Type: leaveType[3],
        StartDate: new Date('12/1/2016 00:00:00'),
        EndDate: new Date('12/1/2016 00:00:00'),
        NumberOfDays: 0.5,
        Comment: 'Approved',
        Status: 'Approved',
        Reason: 'Personal',
        Approvers: [
            {
                Name: 'Sagar Shelar',
                Project: 'HRMS',
                Manager: 'Sagar Shelar',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Kunal Adhikari',
                Project: 'EBS',
                Manager: 'Kunal Adhikari',
                Status: 'Approved',
                Comment: 'Approved'
            },
            {
                Name: 'Pooja Merchant',
                Project: 'HR',
                Manager: 'Pooja Merchant',
                Status: 'Approved',
                Comment: 'Approved'
            }
        ],
        PendingApprovers:[
             {
                Name: 'Sagar Shelar',
            },
            {
                Name: 'Pooja Merchant',
            }
        ]
    },
];

module.exports = leave;
