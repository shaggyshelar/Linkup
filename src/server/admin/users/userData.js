var users = [
    {
        ID: 10,
        UserName: 'admin',
        Password: 'admin',
        Roles: [{
            ID: 1,
            Name: 'SuperAdmin'
        },
            {
                ID: 2,
                Name: 'ESPL Employees'
            }]
    },
    {
        ID: 11,
        UserName: 'user1',
        Password: 'Password',
        Roles: [{
            ID: 2,
            Name: 'ESPL Employees'
        }]
    },
    {
        ID: 12,
        UserName: 'user2',
        Password: 'Password',
        Roles: [{
            ID: 2,
            Name: 'ESPL Employees'
        }]
    },
    {
        ID: 13,
        UserName: 'user3',
        Password: 'Password',
        Roles: [{
            ID: 2,
            Name: 'ESPL Employees'
        }]
    }];
module.exports = users;