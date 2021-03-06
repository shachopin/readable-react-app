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

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, ReduxPromise, thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  
      <div>
        <Route path="/" component={Root}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)




