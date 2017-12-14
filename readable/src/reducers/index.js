import { combineReducers } from 'redux'
import * as helpers from '../helpers'
import { 
  FETCH_POSTS, 
  FETCH_CATEGORIES,
  //FETCH_POSTS_UNDER_CATEGORY,
  //FETCH_POST,
  FETCH_COMMENTS,
  RECEIVE_NEW_POST,
  DELETE_POST,
  RECEIVE_NEW_COMMENT,
  DELETE_COMMENT,
  VOTE_POST,
  VOTE_COMMENT,
  UPDATE_COMMENT
} from '../actions'

function categories(state= [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload
    default: 
      return state
  }
}

function comments(state= {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS : 
      return helpers.reduceAndAdd(action.payload, state)
    case UPDATE_COMMENT :
    case RECEIVE_NEW_COMMENT :
      return {...state, [action.payload.id]: action.payload}
    case DELETE_COMMENT :
       return helpers.removeAndReduce(action.payload.id, state)
    case VOTE_COMMENT :
      return {
        ...state,
        [action.payload.id] : {
          ...state[action.payload.id],
          voteScore: action.payload.voteScore
        }
      }
    default: 
      return state
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS :
      return helpers.reduce(action.payload)
    // case FETCH_POSTS_UNDER_CATEGORY :
    //   action.payload.forEach(function(entry){
    //     state = {...state, [entry.id] : entry}
    //   })   
    //   return state
    // case FETCH_POST :
    //   return {...state, [action.payload.id]: action.payload} 
    case FETCH_COMMENTS :
      return {
        ...state, 
        [action.meta.postId]: {
          ...state[action.meta.postId],
          comments: action.payload.map((comment) => comment.id)            
        }         
      }
    case RECEIVE_NEW_POST :
      state[action.payload.id] && state[action.payload.id].comments && (action.payload.comments = state[action.payload.id].comments)
      return {...state, [action.payload.id]: action.payload} 
    case DELETE_POST :
      return helpers.removeAndReduce(action.payload.id, state)  
    case RECEIVE_NEW_COMMENT :
      return {
        ...state, 
        [action.payload.parentId]: {
          ...state[action.payload.parentId],
          commentCount: state[action.payload.parentId].commentCount + 1,
          comments: [...state[action.payload.parentId].comments, action.payload.id]       
        }         
      }
    case DELETE_COMMENT :
      return {
        ...state, 
        [action.payload.parentId]: {
          ...state[action.payload.parentId],
          commentCount: state[action.payload.parentId].commentCount - 1,
          comments: state[action.payload.parentId].comments.filter((commentId) => commentId !== action.payload.id)  
        }      
      }
    case VOTE_POST :
      return {
        ...state,
        [action.payload.id] : {
          ...state[action.payload.id],
          voteScore: action.payload.voteScore
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  comments
})