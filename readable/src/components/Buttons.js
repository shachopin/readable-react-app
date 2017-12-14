import React from "react"
import { connect } from "react-redux"
import { vote } from "../actions"
import  { remove } from "../actions"
import { Link } from "react-router-dom"

const Buttons = (props) => (
  <div className="pull-right">
    <button onClick={() => props.vote(props.item.id, {option: "upVote"}, props.itemType)} type="button" className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-thumbs-up"></span> Like
    </button>
    <button onClick={() => props.vote(props.item.id, {option: "downVote"}, props.itemType)} type="button" className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-thumbs-down"></span> Dislike
    </button>
    <button onClick={() => props.goToList ? props.remove(props.item.id, props.itemType, props.history.push("/")) : props.remove(props.item.id, props.itemType)} type="button" className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-remove"></span> Delete
    </button>
    {props.itemType === "posts"
     ?
     <Link to={`/${props.item.category}/${props.item.id}/edit`} className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-edit"></span> Edit
     </Link>
     :
     <button onClick={props.handleClick} className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-edit"></span> Edit
     </button>
    }
  </div>
)

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, voteOption, itemType) => dispatch(vote(id, voteOption, itemType)),
    remove: (id, itemType, callback) => dispatch(remove(id, itemType, callback))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Buttons)