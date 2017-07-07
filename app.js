//Set up Express for handling routing
var express = require('express')
var app = express()
//Server Settings
var config = require('./site.json')

//Set up pug as the view engine
app.set('view engine', 'pug')

//Home page
app.get('/', function (req, res) {
  res.render('home', {config: config, title:'Home', page:'home' })
})

//About Me page 
app.get('/about', function (req, res) {
  res.render('about', {config: config, title:'About Me', page:'about' })
})

//Static content handling
app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))
app.use('/fonts', express.static('public/fonts'))
app.use('/images', express.static('public/images'))


//Set the app to listen
//TODO: change to better port, or use sockets
app.listen(80, function () {
  console.log('Example app listening on port 80')
})
