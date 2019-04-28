export default {
  reload: ({results, what}) => (state) => results ? ({...state, [what]: {...state[what], results: results}}) : state,
  changeEquipment: (e) => (state) => ({...state, equipment: {...state['equipment'], results: [], input: e.target.value}})
}
