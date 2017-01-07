var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET home page. */
router.get('/', login_required, function(req, res, next) {
  	res.render('index', { title: 'Home'});
});

function login_required(req, res, next){
	if (req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login/');
	}
}

module.exports = router;
