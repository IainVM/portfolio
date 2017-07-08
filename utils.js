exports.getProjects = function() {

    var glob = require('glob')
    var path = require('path')

    var projects = {};
    glob.sync(path.join(__dirname, "/public/projects/*/")).forEach(function (file) {
        var pName = path.basename(file);
        projects[pName] = require("./public/projects/" + pName + "/info.json");
    });
    return projects;
};

exports.getProject = function(pName) {
    var projects = exports.getProjects();

    if (projects[pName] == undefined){
        return undefined;
    }

    return projects[pName];
};