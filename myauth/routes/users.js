var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup/', function(req, res, next){
	res.render('signup', {title:'Sign Up',})
});

router.post('/signup/', function(req, res, next){
	console.log(req.body);
	res.redirect('/');
});

router.get('/login/', function(req, res, next){
	res.render('login', {title:'Log In',});
});

router.post('/login/', function(req, res, next){
	console.log(req.body);
	res.redirect('/');
});

module.exports = router;
