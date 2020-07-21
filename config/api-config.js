var express = require("express");
var app = express();
var path  = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var db = require('./database');
var dbfunc = require('./db-function');
var http  = require('http')
var bodyParser = require('body-parser');
var SitesRoute = require('../app/routes/site.route');
var AuthenticRoute = require('../app/routes/authentic.route');
var errorCode = require('../common/error-code')
var errorMessage = require('../common/error-methods')
var checkToken = require('./secureRoute');


dbfunc.connectionCheck.then((data) =>{
    //console.log(data);
 }).catch((err) => {
     console.log(err);
 });
 
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

var router = express.Router();
app.use('/app',router);
AuthenticRoute.init(router);
SitesRoute.init(router);

//secureAPI requires token to be provided (JWT) for all requests.
//Here for demonstration. Not used because API doc doesnt specify.

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi',secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req,res) => {
    res.send('try /app/user to register');
});

var ApiConfig = {
  app: app
}

//SitesRoute.init(secureApi);

module.exports = ApiConfig;
