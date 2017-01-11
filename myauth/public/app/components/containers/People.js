import React, { Component } from 'react'

var socket = io()

class People extends Component{
	constructor(){
		super();
		this.state = {
			list: []
		};
	}

	componentDidMount(){
		socket.emit("join",localStorage.getItem("token"));
		socket.on("update-people",(people) => {
			this.setState({
				list: people
			});
		});
		
	}

	personalChat(i){
		 console.log(this.state.list[i]._id);
	}



	

	render(){
		const listItems = this.state.list.map((people,i) => {
			return (
				<li key={i} onClick={this.personalChat.bind(this, i)}> {people.username} </li>
			);
		})
		return (
			<div className={this.props.className}>
				<ul style={{listStyle:"none", padding:0}}>
					{listItems}
				</ul>

			</div>
		)
	}
}

export default People