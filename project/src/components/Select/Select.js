import { h } from 'hyperapp'
import * as DnD from '../../request/DnD.js'

// DnD a besoin d'une fonction de callback à mettre dans then
// toujours avoir l'url dans la value, plus simple de récupérer les infos ensuite

export default (category) => (props, children) => {
  const results = props.state[category].results
  if (results.length === 0) {
    DnD.getRessource(category)
      .then((res) => props.reload({...res, what: category}))
  }

  const items = results.map((item) => <option value={item.url}>{item.name}</option>)

  return (
    <select id={category}>
      <option value='' selected disabled hidden>{children}</option>
      {items}
    </select>
  )
}
