import React, { Component } from 'react'
import APIManager from '../../APIManager'

class Login extends Component{

	login(){
		APIManager.post("/users/login_jwt/",
			{username: document.getElementById('username').value,
			password:document.getElementById('password').value}, (err, res) => {
				if(err){
					alert(err);
					return;
				}
				localStorage.setItem("token", res.body.token);
			})
	}



	render(){
		return(
			<div>
			<div className="form-group">
		      <label htmlFor="username">Username:</label>
		      <input id="username" className="form-control" type="text" name="username" placeholder="Enter your username" />
	      	</div>
	      	<div className="form-group">
		      <label htmlFor="password">Password:</label>
		      <input id="password" type="password" className="form-control" name="password" placeholder="Enter your password" />
	      	</div>
	      	<button className="btn btn-default" type="submit" onClick={this.login.bind(this)} >Submit</button>
	      	</div>
			);
	}
}

export default Login