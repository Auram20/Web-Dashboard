import { h } from 'hyperapp'

export default (category) => (props, children) => {
  const {state} = props
  const bdd = state.bdd[category]
  const items = bdd.map((item) => <option value={item._id}>{item.name}</option>)

  return (
    <select id={category}>
      <option value='' selected disabled hidden>{children}</option>
      {items}
    </select>
  )
}
