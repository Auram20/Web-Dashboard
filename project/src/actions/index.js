import {clamp} from '../utils'
const uniqueId = () => {
  return 'id-' + Math.random().toString(36).substr(2, 16)
}
const makeInvList = value => ({value, id: uniqueId()})
export default {
  load: ({promise, what}) => (state) =>
    promise
      ? {...state, load: {...state.load, [what]: promise}}
      : state,
  update: ({data, what}) => (state) =>
    data
      ? {
        ...state,
        bdd: {...state.bdd, [what]: data},
        load: {...state.load, [what]: true},
        loading: {...state.loading, [what]: false}
      }
      : state,
  updateMany: (array) => (state) => array.reduce(
    (acc, item) => {
      if (!item.data) return acc
      const newBdd = {...acc.bdd, [item.what]: item.data}
      const newLoad = {...acc.load, [item.what]: true}
      const newLoading = {...acc.loading, [item.what]: false}
      return {...acc, bdd: newBdd, load: newLoad, loading: newLoading}
    },
    state),
  change: ({event, what}) => (state) => {
    return ({...state, [what]: {...state[what], input: event.target.value}})
  },
  updateCharacter: ({what, value}) => (state) => {
    return ({...state, character: {...state.character, [what]: value}})
  },
  updateClasse: (value) => (state) => {
    return ({...state, character: {...state.character, classe: value}, skillList: []})
  },
  changeLevel: (e) => (state) => ({...state, character: {...state.character, level: clamp(e.target.min, e.target.max, e.target.value)}}),
  changeStat: ({event, key}) => (state) => ({...state, stats: {...state.stats, [key]: clamp(event.target.min, event.target.max, event.target.value) - event.target.min}}),
  addToInvList: () => state => {
    if (state.inventory.input === null || state.inventoryList.filter((inv) => inv.value === state.inventory.input).length) {
      return state
    }
    const list = [...state.inventoryList, makeInvList(state.inventory.input)]
    return {...state, inventoryList: list}
  },
  deleteToInvList: id => state => {
    const list = state.inventoryList.filter(item => item.id !== id)
    return {...state, inventoryList: list}
  },
  clickSearchInput: ({event, what}) => (state) => {
    return {...state, [what]: {...state[what], input: event.target.textContent, value: event.target.dataset.value}}
  },
  addToSkillList: (id) => state => {
    const list = [...state.skillList, id]
    return {...state, skillList: list}
  },
  removeFromSkillList: id => state => {
    const list = state.skillList.filter(itemId => itemId !== id)
    return {...state, skillList: list}
  }
}
