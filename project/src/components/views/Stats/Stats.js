import { h } from 'hyperapp'
import './Stats.css'
import {clampRight, getStats} from '../../../utils'
import Charts from '../Charts/Charts.js'

export default (props) => {
  const {state} = props
  const {pv, armorClassValue, shield} = getStats(state)

  return (
    <div class='stats2'>
      <div id="stats2">
        <p>PV : <span>{pv}</span></p>
        <p>CA (Armor) : <span>{armorClassValue}</span></p>
        <p>CA (Shield) : <span>{shield}</span></p>
      </div>
    </div>
  )
}
