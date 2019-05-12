import { h } from 'hyperapp'

export default (category) => (props, children) => {
  const {state, onchange} = props
  const bdd = state.bdd[category]
  const items = bdd.map((item, index) => <option value={index}>{item.name}</option>)

  return (
    <select id={category} onchange={onchange}>
      <option value={null} selected disabled hidden>{children}</option>
      {items}
    </select>
  )
}
