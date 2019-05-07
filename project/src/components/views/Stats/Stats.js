import { h } from 'hyperapp'
import './Stats.css'
import {indexOfStat} from '../../../utils'

export default (props) => {
  const {state} = props
  const {character, bdd} = state
  const conRacePoint = character.race ? bdd.races[character.race]['ability_bonuses'][indexOfStat('CON')] : 0
  const classPoint = character.classe ? bdd.classes[character.classe].hit_die : 0
  const conCharPoint = character.stats['CON']
  const pv = classPoint + conCharPoint + conRacePoint

  return (
    <div class='stats2'>
      <div id="stats2">
        <p>PV : <span>{pv}</span></p>
        <p>CA (Armor) : </p>
        <p>CA (Shield) : </p>
      </div>
    </div>
  )
}
