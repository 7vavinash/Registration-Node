var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Todo = require('../models/todo');


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
	res.render('react',{title:"React"});
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

router.get('/add_todo', function(req, res, next){
	res.render('todos', {title:"Todo"})
})

router.post('/add_todo',function(req, res, next){
	Todo.create(req.body, function(err, todo){
		if(err){
			console.log(err);
			return;
		}
		res.redirect('/todos');
	});
});

module.exports = router;
