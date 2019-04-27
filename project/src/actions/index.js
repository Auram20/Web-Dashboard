export default {
  reload: ({results, what}) => (state) => ({...state, [what]: {...state[what], results: results}})
}
