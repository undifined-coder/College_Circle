
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongoose =require("mongoose");
var session =require('express-session');
var passport =require('passport');
const ejs = require('ejs');
var LocalStrategy = require("passport-local");



var app = express();
// view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


require('./config/passport')(passport);

const db = require('./config/key').mongoURI;
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
.then
(function(){
  //console.log('mongodb connected')
})
.catch(function(err){
  console.log(err);
});

app.use(session(
  {
	secret: 'secret',
	resave :false,
	saveUninitialized :false
}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./model/user');



app.use('/', require('./routes/frontend'));
app.use('/', require('./routes/backend'));
app.use('/', require('./routes/signup'));
app.use('/', require('./routes/login'));






app.listen(3000,function(){
  console.log("listening to port:3000");
})

module.exports = app;
