import {clamp} from '../utils'
const uniqueId = () => {
  return 'id-' + Math.random().toString(36).substr(2, 16)
}
const makeInvList = content => ({content, done: false, id: uniqueId()})
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
    const myIndex = parseInt(event.target.value) + 1
    console.log(event.target.options[myIndex].text)
    return ({...state, [what]: {...state[what], input: event.target.options[myIndex].text}})
  },
  updateCharacter: ({what, value}) => (state) => {
    console.log(state.character)
    return ({...state, character: {...state.character, [what]: value}})
  },
  changeLevel: (e) => (state) => ({...state, character: {...state.character, level: clamp(e.target.min, e.target.max, e.target.value)}}),
  changeStat: ({event, key}) => (state) => ({...state, stats: {...state.stats, [key]: clamp(event.target.min, event.target.max, event.target.value) - event.target.min}}),
  addToInvList: () => state => {
    const list = [...state.InventoryList, makeInvList(state.inventory.input)]
    console.log(list)
    return {...state, InventoryList: list}
  },
  deleteToInvList: id => state => {
    const list = state.InventoryList.filter(todo => todo.id !== id)
    return {...state, InventoryList: list}
  }
}
