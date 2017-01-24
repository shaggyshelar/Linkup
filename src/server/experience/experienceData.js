var certificates = [
    {
        Project: {
            Name: 'Project1',
            Manager: {
                Name: 'Manager1'
            }
        },
        StartDate: '10/12/12',
        EndDate: '12/12/15',
        Client: {
            Name: 'Client1'
        },
        Role: 'developer',
        Environment: 'angularJs',
        Duration: '3 years',
        IsCurrentProject: false,
        Responsibilites: '',
        Description: '',
        Status: 'Pending for Approval',
        Comments: '',
        ExperienceFilePath: ''
    }, {
        Project: {
            Name: 'Project2',
            Manager: {
                Name: 'Manager2'
            }
        },
        StartDate: '5/5/12',
        EndDate: '10/10/16',
        Client: {
            Name: 'Client2'
        },
        Role: 'developer',
        Environment: 'angularJs',
        Duration: '2 years',
        IsCurrentProject: true,
        Responsibilites: '',
        Description: '',
        Status: 'Pending for Approval',
        Comments: '',
        ExperienceFilePath: ''
    }
];

module.exports = certificates;