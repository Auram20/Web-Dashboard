import { h } from 'hyperapp'
import './Stats.css'
import {STAT} from '../../../utils'

export default (props) => {
  const {character} = props
  const pv = character.classe ? character.classe.hit_die + character.stats[STAT.CON] : 0

  return (
    <div class='stats'>
      <div>
        <p>PV : <span>{pv}</span></p>
        <p>CA (Armor) : </p>
        <p>CA (Shield) : </p>
      </div>
    </div>
  )
}
