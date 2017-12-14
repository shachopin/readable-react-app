import React, { Component } from 'react'
import { connect } from "react-redux"
import { editPost, fetchPosts } from "../actions"
import Form from "./Form"

class EditPost extends Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.fetchPosts()
    } 
  }
  
  handleSubmit = ({title, body}) => {
    const updatedContent = {
      title,
      body
    }
    this.props.editPost(updatedContent, () => this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`), this.props.post.id)  
  }
  
  render() {
    if (!this.props.post) {
      return <h3>Loading...</h3>
    }
    
    return (
      <Form operation="edit" handleSubmit={this.handleSubmit} post={this.props.post}/>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    editPost: (data, callback, postId) => dispatch(editPost(data, callback, postId)),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)