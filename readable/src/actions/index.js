import uuidv1 from 'uuid/v1'

export const FETCH_POSTS = "fetch_posts"
export const FETCH_CATEGORIES = "fetch_categories"
export const RECEIVE_NEW_POST = "receive_new_post"
export const FETCH_COMMENTS = "fetch_comments"
export const DELETE_POST = "delete_post"
export const RECEIVE_NEW_COMMENT = "receive_new_comment"
export const DELETE_COMMENT = "delete_comment"
export const VOTE_POST = "vote_post"
export const VOTE_COMMENT = "vote_comment"
export const EDIT_POST = "edit_post"
export const UPDATE_COMMENT = "update_comment"

const HOST = "http://localhost:3001"

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export function fetchPosts() {
  const request = fetch(`${HOST}/posts`, {headers})
      .then((res) => res.json())
  
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(newPost, callback) {
  return function(dispatch, getState) {  
    newPost = {
            ...newPost, 
            id: uuidv1(),
            timestemp: Date.now()
            }
  
    fetch(`${HOST}/posts`, {
        method: "POST",
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    }).then((res) => res.json())
      .then((newPost) => {
        dispatch(receiveNewPost(newPost))
        callback(newPost.id)
      })
  }
}

export function editPost(updatedContent, callback, postId) {
  return function(dispatch, getState) {  
    fetch(`${HOST}/posts/${postId}`, {
        method: "PUT",
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContent)
    }).then((res) => res.json())
      .then((updatedPost) => {
        dispatch(receiveNewPost(updatedPost))
        callback()
      })
  }
}

function receiveNewPost(newPost) {
  return {
    type: RECEIVE_NEW_POST,
    payload: newPost
  }
}


/******************************************************/

export function createComment(newComment) {
  newComment = {
            ...newComment, 
            id: uuidv1(),
            timestemp: Date.now()
            }
  const request = 
    fetch(`${HOST}/comments`, {
        method: "POST",
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    }).then((res) => res.json())
 
  return {
    type: RECEIVE_NEW_COMMENT,
    payload: request
  }
}

export function updateComment(updatedContent, commentId) {
  updatedContent = {
            ...updatedContent, 
            timestemp: Date.now()
            }
  const request = 
    fetch(`${HOST}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContent)
    }).then((res) => res.json())
 
  return {
    type: UPDATE_COMMENT,
    payload: request
  }
}

export function fetchComments(postId) {
  const request = fetch(`${HOST}/posts/${postId}/comments`, {headers})
      .then((res) => res.json())
  
  return {
    type: FETCH_COMMENTS,
    payload: request,
    meta: {
      postId
    }
  }
}
/*************************************************/
export function fetchCategories() {
  const request = fetch(`${HOST}/categories`, {headers})
      .then((res) => res.json())
      .then((body) => body.categories)
  
  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}
/*************************************************/
export function vote(id, voteOption, itemType) {
  const request = 
    fetch(`${HOST}/${itemType}/${id}`, 
        {
        method: "POST",
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteOption)
    }).then((res) => res.json())
  
  return {
    type: itemType === "posts" ? VOTE_POST : VOTE_COMMENT,
    payload: request
  }
}
/**************************************************/

export function remove(id, itemType, callback) {
  const request = fetch(`${HOST}/${itemType}/${id}`, {method: "DELETE", headers})
      .then((res) => res.json())
      .then((data) => {
        if(callback) {
          callback();
        }
        return data
      })
  
  return {
    type: itemType === "posts" ? DELETE_POST : DELETE_COMMENT, 
    payload: request
  }
}
