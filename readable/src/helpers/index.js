export function reduce(arr) {
  return arr.reduce(function(result, entry){
    result[entry.id] = entry
    return result
  }, {})
}

export function reduceAndAdd(arr, state) {
  arr.forEach(function(entry){
    state = {...state, [entry.id] : entry}
  })   
  return state
}

export function remove(id, state) {
  const arr = Object.keys(state)
                   .filter((key) => key !== id)
                   .map((key) => state[key])
  return arr           
}

export function removeAndReduce(id, state) {
  const arr = Object.keys(state)
                   .filter((key) => key !== id)
                   .map((key) => state[key])
  return reduce(arr)        
}

export function fixLineBreaks(str) {
  return str.replace(/\n/g, "<br/>")
}