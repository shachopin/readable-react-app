import React from "react"
import { Route, Switch } from "react-router-dom"
import Main from "./Main"
import CreatePost from "./CreatePost"
import PostDetail from "./PostDetail"
import EditPost from "./EditPost"
import BrandingBar from "./BrandingBar"
  
const Root = (props) => (
  <div className="container">  
    <BrandingBar pathname={props.location.pathname} />
    <div id="root">
      <Switch>
        {/*the more specific onces should go top*/}
        <Route path="/posts/new" component={CreatePost} />
        <Route path="/:category/:id/edit" component={EditPost} />
        <Route path="/:category/:id" component={PostDetail} />
        <Route path="/" component={Main} />  
      </Switch>
    </div>
  </div>
)

export default Root

        

