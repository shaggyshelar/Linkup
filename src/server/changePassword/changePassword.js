var utils = require('../utils');
var password = require('./passwordData');
var _ = require('lodash');

module.exports = function (app) {
    app.post('/api/ChangePassword', function (req, res) {
        if (req.body.NewPassword == req.body.ConfirmPassword) {
            if (password.password == req.body.OldPassword) {
                password.password = req.body.ConfirmPassword;
                res.status(200).json({ resp: 1, message: 'Password changed!' });
            }
            else {
                res.status(200).json({ resp: 2, message: 'Old password is invalid, password not changed.' });
            }
        }
        else if (req.body.NewPassword != req.body.ConfirmPassword){
            res.status(200).json({ resp: 3, message: 'Passwords do not match, password not changed.' })
        }
        else {
            res.status(500).end('Bad request');
        }
    });
}