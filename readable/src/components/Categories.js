import React, {Component} from 'react'
import { connect } from "react-redux"
import { fetchCategories } from "../actions"
 
class Categories extends Component {
  componentDidMount() {
    if (this.props.categories.length === 1) {
      this.props.fetchCategories()
    } 
  }
    
  handleSelectCategory(category) {
    if (category === "all") {
      this.props.history.push("/")
      return
    }
    this.props.history.push(`/${category}`)
  }
  
  renderCategories() {
    return this.props.categories.map((category) => (
      <li className="list-group-item" onClick={() => this.handleSelectCategory(category.name)} key={category.name}>
        {category.name}
      </li>
    ))
  }
  
  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          {this.renderCategories()}
        </ul>
      </div>      
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: [{name: "all", path: "all"}, ...state.categories]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)