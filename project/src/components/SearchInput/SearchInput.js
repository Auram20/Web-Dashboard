import './SearchInput.css'
import { h } from 'hyperapp'
// import * as DnD from '../../apiDnD/DnD.js'

export default (promise) => (props, children) => {
  const {state, actions} = props
  const results = state.results

  if (results.length === 0) {
    promise
      .then((res) => state.input !== ''
        ? res.filter((item) => item.name.indexOf(state.input) === 0)
        : res
      )
      .then((res) => res && actions.reload({results: res, what: 'equipment'}))
  }

  const suggestions = results.slice(0, 3).map((item, index) => <div key={index} class='inputResults'>{item.name}</div>)
  console.log(results)

  return (
    <div className='searchInput'>
      <input type='text' placeholder={children} onchange={actions.changeEquipment} />
      {suggestions}
    </div>
  )
}
