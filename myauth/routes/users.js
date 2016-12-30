var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup/', function(req, res, next){
	res.render('signup', {title:'Sign Up', errors:{}})
});

router.post('/signup/', function(req, res, next){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	var errors = req.validationErrors();

	if (errors){
		res.render('signup',{
			errors: errors,
			title: "Sign Up"
		});
	} else{
		var newUser = new User({
			username: username,
			email: email,
			password: password
		});
		User.createUser(newUser, function(err, user){
			if (err) throw err;
			console.log(user);
			
		});
		req.flash('success_msg', 'You are registered')
		res.redirect('/');
	}
});

router.get('/login/', function(req, res, next){
	res.render('login', {title:'Log In',});
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
 	User.getUserByUsername(username, function(err, user){
 		if(err) throw err;

 		if(!user){
 			return done(null, false, {message:'Invalid Username'});
 		}

 		User.comparePassword(password, user.password, function(err,isMatch){
 			if(err) throw err;
 			if(isMatch){
 				var token = jwt.sign(user,"secret",{});
 				// res.json({success:true,token:'JWT '+token});
 				return done(null, user);
 			} else{
 				return done(null, false, {message: "Incorrect Password"});
 			}
 		});
 	});  
}));

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

// For getting jwt token
router.post('/login_jwt/', function(req, res){
	User.getUserByUsername(req.body.username, function(err, user){
 		if(err) throw err;

 		if(!user){
 			res.send(null, false, {message:'Invalid Username'});
 		}else{

	 		User.comparePassword(req.body.password, user.password, function(err,isMatch){
	 			if(err) throw err;
	 			if(isMatch){
	 				var token = jwt.sign(user,"secret",{
	 					expiresIn:10000000000000000
	 				});
	 				res.json({success:true,token:'JWT '+token});
	 				
	 			} else{
 					res.send(null, false, {message: "Incorrect Password"});
 				}
 			});
 		}
 	});
});

router.post('/login/', passport.authenticate('local', { failureFlash: true,
                                                    failureRedirect: '/users/login', successRedirect: '/', successFlash: "Welcome" }), function(req, res){
	req.flash("success_msg","you are logged in");
	res.redirect('/');
});

// Adding jwt protection
router.get('/profile/', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json(req.user);
    }
);

router.get('/logout/', function(req, res){
	req.logout();
	req.flash("success_msg","you are logged out");
	res.redirect('/users/login');
})


module.exports = router;
