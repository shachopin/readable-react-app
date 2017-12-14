import React, {Component} from "react"
import { connect } from "react-redux"
import { fetchPosts } from "../actions"
import Posts from './Posts'

class CategoryPostsList extends Component {
  componentDidMount() {
    if (Object.keys(this.props.postsUnderCategory).length === 0) {
      this.props.fetchPosts()
    }
  }
  
  render() {
    return (
      <Posts posts={this.props.postsUnderCategory}></Posts>   
    )
  }
}

function mapStateToProps(state, ownProps) {
  const category = ownProps.match.params.category
  
  return {
    postsUnderCategory: Object.keys(state.posts)
                              .filter((key) => state.posts[key].category === category)
                              .map((key) => state.posts[key])
                              .reduce(function(result, entry) {
                                result[entry.id] = entry
                                return result   
                              }, {})
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
)(CategoryPostsList)

