import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Todos from './components/containers/Todos'
import People from './components/containers/People'
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
				<div className="row">
					<Todos className="col-md-10" />
					<People className="col-md-2" />
				</div>
			)}
	}
}

ReactDOM.render(<App />, document.getElementById('app'))