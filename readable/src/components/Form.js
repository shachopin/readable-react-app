import React, {Component} from 'react'

class Form extends Component {
  state = {
     title: this.props.post ? this.props.post.title : "",
     body: this.props.post ? this.props.post.body : "",
     category: this.props.post ? this.props.post.category : "",
     author: this.props.post ? this.props.post.author : ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state);
  }
  
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" value={this.state.title} name="title" onChange={this.handleChange} className="form-control" id="title" placeholder="Enter title"/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          {this.props.operation === "edit" 
           ? 
           <input readOnly={this.props.operation === "edit"} type="text" value={this.state.category} name="category" onChange={this.handleChange} className="form-control" id="category" placeholder="Select a category"/>
           :
           <select id="category" className="form-control" type="text" name="category" value={this.state.category} placeholder="Select a category" onChange={this.handleChange}>
            {
              this.props.categories.map((category) => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))
            }
           </select>
          }
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input readOnly={this.props.operation === "edit"} type="text" value={this.state.author} name="author" onChange={this.handleChange} className="form-control" id="author" placeholder="Enter author"/>
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea type="text" value={this.state.body} name="body" onChange={this.handleChange} className="form-control" id="body" placeholder="Enter body" rows="6"></textarea>
        </div>
           
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>  
    )
  }
}

export default Form;