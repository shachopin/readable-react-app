import React from "react"
import { Route, Switch } from "react-router-dom"
import Categories from "./Categories"
import AllPostsList from "./AllPostsList"
import CategoryPostsList from "./CategoryPostsList"
 
const Main = (props) => (
  <div>  
    <Categories history={props.history}/>
    <Switch>
      <Route path="/:category" component={CategoryPostsList}/> {/*test route matching updates component by replace CategoryPostsList with Test*/}
      <Route path="/" component={AllPostsList}/>
    </Switch>                                                                 
  </div>      
) 

export default Main
