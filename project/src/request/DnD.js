import {fetch} from 'whatwg-fetch'

const baseURL = 'http://dnd5eapi.co/api'

export const getFromURL = (url, call) => {
  return fetch(url)
    .then(res => {
      if (res.status >= 400) {
        return new Error('Bad response server')
      }
      return res.json()
    })
    .then(call)
    .catch(error => console.error(error))
}

export const getRessource = (category, id, call) => {
  const _category = category
  const _id = (typeof id === 'function') ? undefined : id
  const _call = (typeof id === 'function') ? id : call

  if (!_category) {
    return new Error('category cannot be null or undefined')
  }

  return getFromURL(`${baseURL}/${_category}/${_id}`)
    .then(_call)
}
