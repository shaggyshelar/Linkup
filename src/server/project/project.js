var utils = require('../utils');
var projectData = require('./projectData');
var _ = require('lodash');

var getProjects = function (req, res) {
    res.json(projectData.projectList);
};

var getProjectById = function (req, res) {
    var id = parseInt(req.params.id);
    var index = _.findIndex(projectData.projectList, { Id: id });
    res.json(projectData.projectList[index]);
};

var saveProject = function (req, res) {
    var project = req.body;
    project.Id = ++projectData.ids;
    projectData.projectList.push(project);
    res.json(project);
};

var editProject = function (req, res) {
    var project = req.body;
    var index = _.findIndex(projectData.projectList, { Id: project.Id });
    projectData.projectList[index] = project
    res.json(project);
};

module.exports = function (app) {
    app.get('/api/project',utils.EnsureAuthenticated, getProjects);
    app.get('/api/project/:id', getProjectById);
    app.post('/api/project', saveProject);
    app.put('/api/project', editProject);
};