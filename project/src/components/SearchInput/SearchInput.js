import './SearchInput.css'
import { h } from 'hyperapp'

export default (category) => (props, children) => {
  const {state, actions, what, filter, message} = props
  const bdd = state.bdd[category]

  const items = bdd.map((item, index) => ({item, index}))

  const allSuggestions = state.input !== ''
    ? items.filter(({item}) => {
      const itemName = item.name.toLowerCase()
      const stateInput = state[what].input.toLowerCase()
      return itemName.indexOf(stateInput) === 0
    })
    : items

  const suggestions = allSuggestions.filter(filter || (() => true)).slice(0, 3).map(({item, index}) => <a key={index} data-value={index} onclick={(e) => actions.clickSearchInput({event: e, what})}>{item.name}</a>)

  const results = suggestions.length > 0 ? suggestions : (message || <span>Choose a class</span>)

  return (
    <div className={category + ' searchInput'}>
      <input type='text' value={state[what].input} placeholder={children} onchange={() => actions.change({what})} onkeyup={(e) => actions.keyup({event: e, what})}/>
      <div className='inputResults'>
        {results}
      </div>
    </div>
  )
}
