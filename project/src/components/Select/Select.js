import { h } from 'hyperapp'

// toujours avoir l'url dans la value, plus simple de récupérer les infos ensuite

export default (category) => (props, children) => {
  const {state} = props
  const bdd = state.bdd[category]
  const items = bdd.map((item) => <option value={item.url}>{item.name}</option>)

  return (
    <select id={category}>
      <option value='' selected disabled hidden>{children}</option>
      {items}
    </select>
  )
}
