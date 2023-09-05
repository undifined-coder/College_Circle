var express = require('express');
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var passport =require('passport');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var User =require('../model/user');

/* GET home page. */
router.get('/', function(req, res) {
  if(req.user){
    res.render('home', {user: req.user});
  }
  else{
    res.render('home',{user: req.user});
  }
});

/*Main page after logging in*/





/*register page request */
router.get('/register', function(req, res) {
  res.render('signup', {user:req.user});
});

/*add blog request */
router.get('/add', function(req,res) {
  if(req.user)
  res.render('add',{user: req.user});
  else 
  res.redirect('/',{user : req.user});
});


router.get('/myBlogs', function(req,res) {
  if(req.user){
    res.render('myblogs', {user: req.user});
  }
  else{
    res.redirect('/login');
  }
  
});

router.get('/about', function(req,res) {
  
    res.render('about', {user: req.user});
 
  
});


module.exports = router;
