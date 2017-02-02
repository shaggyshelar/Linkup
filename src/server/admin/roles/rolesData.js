// List of hardcoded users along with their details.
var roles = {
    roleList: [{
        ID: 1,
        Name: 'SuperAdmin',
        Permissions: [
            {
                ID: 1,
                Key: 'DASHBOARD.READ',
                Text: 'Can read Dasboard'
            },
            {
                ID: 2,
                Key: 'PROFILE.MANAGE',
                Text: 'Can manage Profile'
            },
            {
                ID: 3,
                Key: 'PROFILE.ALLPROFILES.READ',
                Text: 'Can read ALL Profile'
            }]
    },
    {
        ID: 2,
        Name: 'Management Team',
        Permissions: [
            {
                ID: 5,
                Key: 'PROFILE.RECENTPROFILES.READ',
                Text: 'Can read Recent Profile'
            },
            {
                ID: 6,
                Key: 'PROFILE.MYPROFILES.READ',
                Text: 'Can read My Profile'
            },
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            }]
    },
    {
        ID: 3,
        Name: 'Recruitment Head',
        Permissions: [
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            },
            {
                ID: 8,
                Key: 'RRF.MYRRF.READ',
                Text: 'Can read MY RRF '
            },
            {
                ID: 9,
                Key: 'RRF.RRFAPPROVAL.READ',
                Text: 'Can read RRF Approval'
            }]
    },
    {
        ID: 4,
        Name: 'Delivery Manager',
        Permissions: [
            {
                ID: 5,
                Key: 'PROFILE.RECENTPROFILES.READ',
                Text: 'Can read Recent Profile'
            },
            {
                ID: 6,
                Key: 'PROFILE.MYPROFILES.READ',
                Text: 'Can read My Profile'
            },
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            }]
    },
    {
        ID: 5,
        Name: 'Project Manager',
        Permissions: [
            {
                ID: 5,
                Key: 'PROFILE.RECENTPROFILES.READ',
                Text: 'Can read Recent Profile'
            },
            {
                ID: 6,
                Key: 'PROFILE.MYPROFILES.READ',
                Text: 'Can read My Profile'
            },
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            }]
    },
    {
        ID: 6,
        Name: 'HR Team',
        Permissions: [
            {
                ID: 5,
                Key: 'PROFILE.RECENTPROFILES.READ',
                Text: 'Can read Recent Profile'
            },
            {
                ID: 6,
                Key: 'PROFILE.MYPROFILES.READ',
                Text: 'Can read My Profile'
            },
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            }]
    },
    {
        ID: 7,
        Name: 'HR Head',
        Permissions: [
            {
                ID: 5,
                Key: 'PROFILE.RECENTPROFILES.READ',
                Text: 'Can read Recent Profile'
            },
            {
                ID: 6,
                Key: 'PROFILE.MYPROFILES.READ',
                Text: 'Can read My Profile'
            },
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            }]
    },
    {
        ID: 8,
        Name: 'ESPL Employees',
        Permissions: [
            {
                ID: 5,
                Key: 'PROFILE.RECENTPROFILES.READ',
                Text: 'Can read Recent Profile'
            },
            {
                ID: 6,
                Key: 'PROFILE.MYPROFILES.READ',
                Text: 'Can read My Profile'
            },
            {
                ID: 7,
                Key: 'RRF.MANAGE',
                Text: 'Can manage RRF'
            }]
    }],
    ids: 8
};
module.exports = roles;