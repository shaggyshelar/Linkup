var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');

app.use(compression());
app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./apis')(app);
require('./corporate/conferenceBooking/conferenceBooking')(app);
require('./corporate/ticket/ticket')(app);
require('./master/leaveTypeMaster/leaveTypeMaster')(app);
require('./master/skillMaster/skillMaster')(app);
require('./master/certificationCodeMaster/certificationCodeMaster')(app);
require('./master/certificationMaster/certificationMaster')(app);
require('./master/classMaster/classMaster')(app);
require('./master/identityTypeMaster/identityTypeMaster')(app);
require('./master/gradeMaster/gradeMaster')(app);
require('./master/conferenceRoom/conferenceRoom')(app);
require('./master/priority/priority')(app);
require('./master/concern/concern')(app);
require('./master/department/department')(app);

app.get('/', function (req, res) {
    res.render('index.html');
});

server.listen(process.env.PORT || 4000, function () {
    console.log('APP listening on port 4000!');
});