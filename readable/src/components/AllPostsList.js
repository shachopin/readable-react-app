import React, {Component} from "react"
import { connect } from "react-redux"
import { fetchPosts } from "../actions"
import Posts from "./Posts"

class AllPostsList extends Component {
  componentDidMount() {
    if (Object.keys(this.props.posts).length === 0) {
      this.props.fetchPosts()
    }
  }
    
  render() {
    return ( 
      <Posts posts={this.props.posts}></Posts> 
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPostsList)