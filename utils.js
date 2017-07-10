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

exports.getLanguages = function() {
    var projects = exports.getProjects();

    var languages = {};

    for (project in projects){
        for (language in projects.languages){
            languages[language] += 1;
        }
    }

    return languages;
}

exports.getTools = function() {
    var projects = exports.getProjects();

    var tools = {};

    for (project in projects){
        for (tool in projects.tools){
            tools[tool] += 1;
        }
    }

    return tools;
}