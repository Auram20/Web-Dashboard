import {fetch} from 'whatwg-fetch'

const baseURL = 'http://dnd5eapi.co/api'

const init = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': baseURL,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Origin, X-Auth-Token',
    'Access-Control-Max-Age': 86400
  },
  credentials: 'include'
}

export const getFromURL = (url) => {
  return fetch(url, init)
    .then(res => {
      if (res.status >= 400) {
        return new Error('Bad response server')
      }

      return res.json()
    })
    .catch(error => console.error(error))
}

export const getRessource = (category, id = '') => {
  if (!category) {
    return new Error('category cannot be null or undefined')
  }

  return getFromURL(`${baseURL}/${category}/${id}`)
}

export const getEquipment = (type) => {
  return getRessource('equipment')
    .then(({results}) => {
      return Promise.all(results.map((item) => getFromURL(item.url)))
    })
    .then((items) => type
      ? items.filter(({equipment_category}) => equipment_category === type)
      : items
    )
}

export const getLevels = (classe) => {
  const array20 = new Array(20)
  array20.fill(0)
  const promises = Promise.all(array20.map((i, index) => {
    const url = `${baseURL}/classes/${classe}/level/${index + 1}`
    return getFromURL(url)
  }))
  return promises
}

export const getDetailedRessource = (category) => {
  return getRessource(category)
    .then(({results}) => {
      return Promise.all(results.map((item) => getFromURL(item.url)))
    })
}

export const getClasses = () => getDetailedRessource('classes')

export const getRaces = () => getDetailedRessource('races')
