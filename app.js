//Set up Express for handling routing
var express = require('express')
var app = express()

//Create locals for use during app
app.locals.moment = require('moment')
var fs = require('fs')

//Site Settings
var site = require('./site.json')

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

//Projects page, displays all projects
app.get('/projects', function (req, res) {
  //Scan projects folder to get list of projects
  fs.readdir('./public/projects', function (error, data) {
    //Throw error if things go wrong
    if (error) {
      res.status(500).send(error);
      return;
    }
    //Get the extra info on each project
    var projects = {}
    data.forEach(function (entry) {
      projects[entry] = require("./public/projects/" + entry + "/info.json")
    })
    res.render('projects', { site: site, title: 'My Projects', url: req.url, projects: projects })
  });
})

//Static content handling
app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))
app.use('/fonts', express.static('public/fonts'))
app.use('/images', express.static('public/images'))

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
app.listen(80, function () {
  console.log('Example app listening on port 80')
})
