import { h } from 'hyperapp'
import * as DnD from '../../apiDnD/DnD.js'

// toujours avoir l'url dans la value, plus simple de récupérer les infos ensuite

export default (category) => (props, children) => {
  const results = props.state[category].results
  if (results.length === 0) {
    DnD.getRessource(category)
      .then((res) => props.reload({results: res.results, what: category}))
  }

  const items = results.map((item) => <option value={item.url}>{item.name}</option>)

  return (
    <select id={category}>
      <option value='' selected disabled hidden>{children}</option>
      {items}
    </select>
  )
}
