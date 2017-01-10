import React, {Component} from 'react'

class Todo extends Component {
	render(){
		return(
			<div style={styles.container} className="row" >
				<input type="checkbox" className="col-sm-1" />
				<p className="col-sm-9" style={styles.task}>{this.props.task} </p>
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
		marginTop:10
	},
	task:{
		margin:0
	}
}

export default Todo