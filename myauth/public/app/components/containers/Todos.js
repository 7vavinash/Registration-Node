import React, { Component} from 'react'
import superagent from 'superagent'
import APIManager from '../../APIManager'
import Todo from "../presentations/todo"

var socket = io()



class Todos extends Component {
	constructor(){
		super();
		this.state = {
			todo: {
				task: ""
			},
			list: []
		}
	}

	componentDidMount(){
		APIManager.get('/todos/', null, (err, res) => {
			if (err){
				alert (err);
				return;
			}
			let updatedList = res.body;
			this.setState({
				list: updatedList.reverse()
			});
		});

	}

	updateTodos(event){
		let updatedTodo = Object.assign({}, this.state.todo);
		updatedTodo['task'] = event.target.value;
		this.setState({
			todo: updatedTodo
		})
	}
	submitTodo(){
		let updatedList = Object.assign([], this.state.list);

		APIManager.post('/add_todo', this.state.todo, (err, res) =>{
			if(err){
				alert(err);
				return;
			}

			updatedList.push(res.body);
			this.setState({
				list: updatedList
			});
		});
		
	}

	render(){
		const listItems = this.state.list.map((todo,i) => {
			return (
				<li key={i}> <Todo todo={todo} /> </li>
			);
		})
		return (
			<div className={this.props.className}>
				<div style={{marginTop:20}} className="container row">
				<div className="form-group col-md-5">
					<input onChange={this.updateTodos.bind(this)} className="form-control" placeholder="Type your task" name="task" />
				</div>
				<button onClick={this.submitTodo.bind(this)} className="btn btn-submit col-md-2" > Submit </button>
				</div>
				<ul className="col-md-9" style={{listStyle:"none", marginLeft:15}}>
					{listItems}
				</ul>

			</div>
		)
	}
}

export default Todos