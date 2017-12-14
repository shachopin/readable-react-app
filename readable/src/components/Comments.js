import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchComments } from "../actions"
import Comment from "./Comment"
import CreateComment from "./CreateComment"

class Comments extends Component {
  componentDidMount() {
    if (!this.props.comments) {
      this.props.fetchComments(this.props.postId)
    }
  }
  
  render() {
    if (!this.props.comments) {
      return <h3>Loading Comments...</h3>
    }
    return (
      <div>
        <ul className="list-group">
          {this.props.comments.map((commentId) => (
            <Comment commentDetails={this.props.commentDetails} commentId={commentId} key={commentId}/>
          ))}  
        </ul>
        <CreateComment postId={this.props.postId}/> 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    commentDetails: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)