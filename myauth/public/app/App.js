import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Todos from './components/Todos'

class App extends Component {

	render(){
		return (
			<div>
				<p>This is a React Component!</p>
				<Todos />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))