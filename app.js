//Set up Express for handling routing
var express = require('express')
var app = express()

//Create locals for use during app
app.locals.moment = require('moment')

//Site Settings
var site = require('./site.json')
var utils = require('./utils.js')

//Set up pug as the view engine
app.set('view engine', 'pug')

//Home page
app.get('/', function (req, res) {
  res.render('home', { site: site, title: 'Home', url: req.url })
})

//About Me page 
app.get('/about', function (req, res) {
  res.render('about', { site: site, title: 'About Me', url: req.url })
})

//About Me page 
app.get('/cv', function (req, res) {
  res.render('cv', { site: site, title: 'My CV', url: req.url })
})

//Projects page, displays all projects
app.get('/projects', function (req, res) {
  //Go retreive the projects and their info.json
  var projects = utils.getProjects();
  res.render('projects', { site: site, title: 'My Projects', url: req.url, projects: projects });
})

//Directs to projects page
app.get('/projects/:pName', function (req, res, next) {
  //Scan projects folder to get list of projects
  var project = utils.getProject(req.params.pName);
  if (project != undefined) {
    res.render('project', { site: site, title: project.name, url: req.url, project: project })
    return;
  }
  next();
})

//Static content handling
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/fonts', express.static('public/fonts'));
app.use('/images', express.static('public/images'));
app.use('/files', express.static('public/files'));

//Some 404 handling
app.get("/*", function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('errors/404', { site: site, title: 'Error', url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

//Set the app to listen
//TODO: change to better port, or use sockets
app.listen(9001, function () {
  console.log('[Iainvm.tech] Portfolio app listening on port 9001')
})
