import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { BrowserRouter, Route } from "react-router-dom"
import Root from "./components/Root"
import reducer from "./reducers"
import ReduxPromise from "redux-promise"
import thunk from "redux-thunk"

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/*
So `composeEnhancers` will either be `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` or `compose`


[8:13] 
I’m only guessing here, but `__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` is probably a compose-function, set by redux if `dev` is true.


[8:13] 
(and redux exists) (edited)


Harsh Patel [8:17 AM] 
@RK_M I think that too, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ might be like window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(__REDUX_DEVTOOLS_EXTENSION_) : false


[8:17] 
Thanks!
*/
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, ReduxPromise, thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  
      <div>{/* BrowserRouter can only allow one child */}
        <Route path="/" component={Root}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)




