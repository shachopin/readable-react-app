import React, { Component } from "react"
import Buttons from "./Buttons"
import EditComment from "./EditComment"
import * as helpers from "../helpers"

class Comment extends Component {
  state = {
    editMode: false,
    body: this.props.commentDetails[this.props.commentId].body
  }

  handleChange = (e) => {
    this.setState({body: e.target.value})
  }
  
  handleCancelButtonClick = () => {
    this.handleChangeEditMode(false)
    this.setState({body: this.props.commentDetails[this.props.commentId].body})
  }
  
  enableEditMode = () => {
    this.handleChangeEditMode(true)
  }

  handleChangeEditMode = (editMode) => {
    this.setState({editMode})
  }

  render() {
    return (
      <li className="list-group-item">
        <Buttons handleClick={this.enableEditMode} item={this.props.commentDetails[this.props.commentId]} itemType="comments"/>
        
        <h4><strong><em>{this.props.commentDetails[this.props.commentId].author}</em></strong> wrote:</h4>
        {
        this.state.editMode 
        ?
        <EditComment 
          body={this.state.body}
          commentId={this.props.commentId}
          handleChange={this.handleChange}
          handleCancelButtonClick={this.handleCancelButtonClick}
          onChangeEditMode={this.handleChangeEditMode}
        />
        :
        <blockquote dangerouslySetInnerHTML={{__html: helpers.fixLineBreaks(this.state.body)}}></blockquote>
        }   
        current score: {this.props.commentDetails[this.props.commentId].voteScore}         
      </li>
    )
  }
}

export default Comment