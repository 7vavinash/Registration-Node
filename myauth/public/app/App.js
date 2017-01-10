import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Todos from './components/containers/Todos'
import Login from './components/containers/Login'

class App extends Component {

	render(){
		if(localStorage.getItem("token") == null ){
		return (
			<div>
				<Login />
			</div>
		)} else{
			return(
				<div>
					<p>This is a React Component!</p>
					<Todos />
				</div>
			)}
	}
}

ReactDOM.render(<App />, document.getElementById('app'))