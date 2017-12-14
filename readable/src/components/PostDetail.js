import React, {Component} from "react"
import { connect } from "react-redux"
import { fetchPosts } from "../actions"
import Comments from "./Comments"
import Buttons from "./Buttons"
import * as helpers from "../helpers"

class PostDetail extends Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.fetchPosts()
    } 
  }
  
  render() {
    if (!this.props.post) {
      return <h3>Loading...</h3>
    }
    
    return (
      <div>  
        <Buttons item={this.props.post} goToList={true} history={this.props.history} itemType="posts"/>
        <div className="row">
          <div className="col-xs-6">
            <h3>
              {this.props.post.title}
            </h3>
            by: <em>{this.props.post.author}</em><br />
            category: {this.props.post.category} <br />
            number of comments: {this.props.post.commentCount} <br />
            current score: {this.props.post.voteScore} <br />
            <h4 className="well" dangerouslySetInnerHTML={{__html: helpers.fixLineBreaks(this.props.post.body)}}></h4>
          </div>
        </div>
        <Comments postId={this.props.match.params.id} comments={this.props.post.comments} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id]
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
)(PostDetail)

