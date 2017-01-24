var utils = require('../utils');
var _ = require('lodash');
var identityProofData = require('./identityProofData');

module.exports = function(app) {
    app.get('/api/IdentityProof', function(req, res) {
        res.json(identityProofData);
    });
    app.post('/api/IdentityProof', function(req, res) {
        var identityProof = req.body;
        identityProof.ID = identityProofData.length + 1;
        identityProofData.push({
            ID: identityProofData.length + 1,
            Type: {
                Name: identityProof.Type
            },
            Value: identityProof.Value
        });
        res.sendStatus(200);
    });
    app.put('/api/IdentityProof', function(req, res) {
        var identityProof = req.body;
        var index = _.findIndex(identityProofData, { ID: identityProof.ID });
        identityProofData[index].Type.Name = identityProof.Type;
        identityProofData[index].Value = identityProof.Value;
        res.sendStatus(200);
    });
};
