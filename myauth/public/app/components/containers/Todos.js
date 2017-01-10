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
		socket.on("init", () =>{
			console.log("socket connected")
		});
		APIManager.get('/todos/', null, (err, res) => {
			if (err){
				alert (err);
				return;
			}
			let updatedList = res.body;
			this.setState({
				list: updatedList
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
		console.log(localStorage.getItem('token'));
		const listItems = this.state.list.map((todo,i) => {
			return (
				<li key={i}> <Todo task={todo.task} /> </li>
			);
		})
		return (
			<div>
				<input onChange={this.updateTodos.bind(this)} className="form-control" placeholder="Type your task" name="task" />
				<button onClick={this.submitTodo.bind(this)} className="btn btn-submit" > Submit </button>
				<ul style={{listStyle:"none", padding:0}}>
					{listItems}
				</ul>

			</div>
		)
	}
}

export default Todos