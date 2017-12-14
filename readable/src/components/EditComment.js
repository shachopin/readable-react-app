import React, { Component } from "react"
import { updateComment } from "../actions"
import { connect } from "react-redux"

class EditComment extends Component {    
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateComment({body: this.props.body}, this.props.commentId)
    this.props.onChangeEditMode(false)
  }
  
  render() {
    return (   
      <form onSubmit={this.handleSubmit}>
        <div className="row form-group">
          <div className="col-xs-6">
            <textarea className="form-control" type="text" name="body" value={this.props.body} onChange={this.props.handleChange} id="body" placeholder="Enter comment here..." rows="6"/>        
          </div>
        </div>
        <button className="btn btn-info">Save</button>
        <button type="button" onClick={this.props.handleCancelButtonClick} className="btn btn-succcess">Cancel</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (updatedContent, commentId) => dispatch(updateComment(updatedContent, commentId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EditComment)


