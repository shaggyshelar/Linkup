var utils = require('../utils');

var getEmployee = function (req, res) {
    res.json(EmpData);
};
module.exports = function (app) {
    app.get('/api/Employee/currentuser',utils.EnsureAuthenticated, getEmployee);
    app.get('/api/Employee/:id',utils.EnsureAuthenticated, getEmployee);
};

var EmpData={
  "Employee": {
    "Name": "Kunal Kirankumar Adhikari",
    "ID": 85
  },
  "Designation": {
    "Value": "Program Manager",
    "ID": 31
  },
  "Department": {
    "Value": "EBS",
    "ID": 1
  },
  "Status": {
    "Value": "Active",
    "ID": 1
  },
  "MaritalStatus": {
    "Value": "Married",
    "ID": 1
  },
  "EmpID": "10014",
  "DOJ": "2011-03-31T18:30:00Z",
  "DOB": "1984-12-28T18:30:00Z",
  "PassportNumber": "K1622143",
  "PersonalContactNumber": "9823153823",
  "EmailIDOfficial": "kunal.adhikari@eternussolutions.com",
  "EmailIDPersonal": "adhikari.kunal@gmail.com",
  "FirstName": "Kunal",
  "MiddleName": "Kirankumar",
  "LastName": "Adhikari",
  "Gender": "Male"
}