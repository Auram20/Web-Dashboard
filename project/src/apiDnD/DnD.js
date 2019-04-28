import {fetch} from 'whatwg-fetch'

const baseURL = 'http://dnd5eapi.co/api'

export const getFromURL = (url) => {
  return fetch(url)
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

export const getDetailedRessource = (category) => {
  return getRessource(category)
    .then(({results}) => {
      return Promise.all(results.map((item) => getFromURL(item.url)))
    })
}

export const getClasses = () => getDetailedRessource('classes')

export const getRaces = () => getDetailedRessource('races')
