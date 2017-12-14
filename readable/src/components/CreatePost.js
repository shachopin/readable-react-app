import React, {Component} from "react"
import { connect } from "react-redux"
import { createPost, fetchCategories, fetchPosts } from "../actions"
import Form from "./Form"

class CreatePost extends Component {
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories()
      this.props.fetchPosts()
    }
  }
  
  handleSubmit = (formState) => {
    const newPost = {...formState}
    if (!newPost.category) {
      newPost.category = this.props.categories[0].name
    }
    this.props.createPost(newPost, (postId) => this.props.history.push(`/${newPost.category}/${postId}`))  
  }
  
  render() {
    return (
      <Form operation="create" handleSubmit={this.handleSubmit} categories={this.props.categories}/>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (data, callback) => dispatch(createPost(data, callback)),
    fetchCategories: (data) => dispatch(fetchCategories(data)),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)