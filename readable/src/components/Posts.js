import React, {Component} from "react"
import Post from "./Post"
import sortBy from 'sort-by'

class Posts extends Component {
  state = {
    sortBy: "voteScore"
  }

  handleChange = (e) => {
    this.setState({sortBy: e.target.value})
  }
  
  render() {
    return (
      <div className="posts">
          <div className="form-inline pull-right">
            <label htmlFor="sortBy">Sort By: </label>
            <select id="sortBy" type="text" name="sortBy" value={this.state.sortBy} className="form-control" onChange={this.handleChange}>
              <option value="voteScore">Score</option>
              <option value="date">Date</option> 
            </select>
          </div>
          <ul id="postslist" className="list-group">
            {Object.keys(this.props.posts)
              .map((key) => this.props.posts[key])
              .sort(sortBy(this.state.sortBy))
              .map((post) => (
                 <Post key={post.id} post={post}/>
              ))}
          </ul>
      </div>
    )
  }
}

export default Posts
