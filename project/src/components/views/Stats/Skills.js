import { h } from 'hyperapp'
import './Stats.css'

export default () => {
  return (
    <div>
      <select>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <div id="skillsArea"></div>
    </div>
  )
}
