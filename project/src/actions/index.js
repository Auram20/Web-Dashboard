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
  change: ({event, what}) => (state) => ({...state, [what]: {...state[what], input: event.target.value}})
}
