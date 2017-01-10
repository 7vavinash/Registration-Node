var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Todo = require('../models/todo');
var LocalStorage = require('node-localstorage').LocalStorage,
					localStorage = new LocalStorage('./scratch');


function login_required(req, res, next){
	if (req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login/');
	}
}


/* GET home page. */
router.get('/', login_required, function(req, res, next) {
  	res.render('index', { title: 'Home'});
});

router.get('/react', function(req, res, next){
	console.log(localStorage.getItem('token'));
	res.render('todos',{title:"Todos"});
});

router.get('/todos', function(req, res, next){
	Todo.find({}, function(err, todos){
		if (err){
			res.json({
				err: err
			});
			return;
		}
		res.json(todos);
	});
});


router.post('/add_todo',function(req, res, next){
	Todo.create(req.body, function(err, todo){
		if(err){
			console.log(err);
			return;
		}
		res.json(todo);
	});
});

module.exports = router;
