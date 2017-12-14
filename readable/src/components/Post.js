import React from "react"
import Buttons from "./Buttons"
import { Link } from "react-router-dom"

const Post = (props) => (
  <div>    
    <li className="list-group-item">
      <Buttons item={props.post} itemType="posts"/>
      <div className="row">
        <div className="col-xs-6">
          <div>score: {props.post.voteScore};  comments: {props.post.commentCount}</div> 
          <Link to={`/${props.post.category}/${props.post.id}`}><h3>{props.post.title}</h3></Link> by <em>{props.post.author}</em> 
        </div>
      </div>
    </li>       
  </div>
)

export default Post