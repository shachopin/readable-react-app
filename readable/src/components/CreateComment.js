import React, { Component } from "react"
import { createComment } from "../actions"
import { connect } from "react-redux"

class CreateComment extends Component {
  state = {
    body: "",
    author: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
                  ...this.state, 
                  parentId: this.props.postId
                 }
    this.props.createComment(data)
    this.setState({body: "", author: ""})
  }
  
  render() {
    return (   
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="body">Comment:</label>       
            <textarea type="text" value={this.state.body} name="body" onChange={this.handleChange} className="form-control" id="body" placeholder="Enter comment here..." rows="6"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="author">Author: </label>
            <input type="text" name="author" value={this.state.author} onChange={this.handleChange} className="form-control" id="author" placeholder="Enter your name..."/>         
          </div>
        </div>
        <button className="btn btn-info">Add New Comment</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: (data) => dispatch(createComment(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateComment)


