import React, {Component} from 'react'

class Todo extends Component {
	render(){
		const timestamp = this.props.todo.timestamp.split("T")[0];
		
		return(
			<div style={styles.container} className="row" >
				<input type="checkbox" className="col-sm-1" />
				<div className="col-sm-9">
				<p style={styles.task}>{this.props.todo.task} </p>
				<span>{timestamp}</span>
				</div>
				<p className="col-sm-1"><a href="#">Edit</a></p>
				<p className="col-sm-1"><a href="#">Delete</a></p>
			</div>
			);
	}
}

const styles = {
	container:{
		padding:12,
		background:"#f9f9f9",
		border: "1px solid #ddd",
		borderRadius:12,
		marginTop:10
	},
	task:{
		margin:0
	}
}

export default Todo