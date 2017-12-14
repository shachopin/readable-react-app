import React from "react"
import { Link } from "react-router-dom"

const BrandingBar = (props) => {
  const writePostButton = <Link to="/posts/new">Write a post</Link>
  const homeButton = <Link to="/">Home</Link>
  
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                  <Link className="navbar-brand" to="/">Readable</Link>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                      <li>{props.pathname.split("/").length > 2 ? homeButton : writePostButton}</li>
                  </ul>
              </div>
          </div>
      </nav>
    </div>
  )
}

export default BrandingBar