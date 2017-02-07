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
require('./admin/features/features')(app);
require('./admin/roles/roles')(app);
require('./admin/users/users')(app);
require('./admin/users/user-role')(app);
require('./admin/permissions/permissions')(app);
require('./corporate/conferenceBooking/conferenceBooking')(app);
require('./corporate/ticket/ticket')(app);
require('./profiles/profiles')(app);
require('./achievements/achievements')(app);
require('./certificates/certificates')(app);
require('./skills/skills')(app);
require('./experience/experience')(app);
require('./employmentHistory/employmentHistory')(app);
require('./education/education')(app);
require('./address/address')(app);
require('./identityProof/identityProof')(app);
require('./nominees/nominees')(app);
require('./passport/passport')(app);
require('./uan/uan')(app);
require('./visa/visa')(app);
require('./leaves/leaves')(app);
require('./holidays/holiday')(app);
require('./changePassword/changePassword')(app);
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
require('./master/client/client')(app);
require('./master/projectType/projectType')(app);
require('./master/priceType/priceType')(app);
require('./master/deliveryModel/deliveryModel')(app);
require('./master/deliveryUnit/deliveryUnit')(app);
require('./master/projectCategory/projectCategory')(app);
require('./project/project')(app);
require('./employee/employee')(app);

app.get('/', function (req, res) {
    res.render('index.html');
});

server.listen(process.env.PORT || 4000, function () {
    console.log('APP listening on port 4000!');
});