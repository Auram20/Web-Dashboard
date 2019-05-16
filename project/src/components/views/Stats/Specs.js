import { h } from 'hyperapp'
import './Stats.css'
import {getLevelPointsFromClass, initStat, clampRight} from '../../../utils'

export default (props) => {
  const {state, changeStat} = props
  const {character, bdd, stats} = state
  const bonus = character.classe ? getLevelPointsFromClass(bdd.classes[character.classe], character.level) : 0
  const total = bonus - Object.values(stats).reduce((acc, stat) => acc + stat, 0)
  const statsRaceArray = character.race ? bdd.races[character.race]['ability_bonuses'] : new Array(6).fill(0)
  const statsRace = initStat(statsRaceArray)

  const statTemplate = Object.keys(initStat())

  const statItems = statTemplate.map(
    (key) =>
      <label>{key + ' : '}
        <input
          type='number'
          value={clampRight(stats[key] + character.stats[key] + statsRace[key], 20)}
          onchange={(e) => changeStat({key: key, event: e})}
          min={character.stats[key] + statsRace[key]}
          max={clampRight(stats[key] + character.stats[key] + total + statsRace[key], 20)}
        />
        {statsRace[key] !== 0 && <p>dont +{statsRace[key]}</p>}
      </label>
  )

  return (
    <div class='stats'>
      <div class='first'>
        {statItems.slice(3, 6)}
      </div>
      <div class='second'>
        {statItems.slice(0, 3)}
      </div>
      <p>Points : <span>{total}</span></p>
    </div>
  )
}
