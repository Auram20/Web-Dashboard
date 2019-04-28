import './SearchInput.css'
import { h } from 'hyperapp'

export default (category) => (props, children) => {
  const {state, actions, what} = props
  const bdd = state.bdd[category]

  const allSuggestions = state.input !== ''
    ? bdd.filter((item) => {
      const itemName = item.name.toLowerCase()
      const stateInput = state[what].input.toLowerCase()
      return itemName.indexOf(stateInput) === 0
    })
    : bdd

  const suggestions = allSuggestions.slice(0, 3).map((item, index) => <div key={index} class='inputResults'>{item.name}</div>)

  return (
    <div className={category + ' searchInput'}>
      <input type='text' placeholder={children} onchange={(e) => actions.change({event: e, what})} />
      {suggestions}
    </div>
  )
}
