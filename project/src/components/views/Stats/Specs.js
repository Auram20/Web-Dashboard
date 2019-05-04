import { h } from 'hyperapp'
import './Stats.css'
import {getLevelPointsFromClass, initStat} from '../../../utils'

export default (props) => {
  const {state, changeStat} = props
  const {character, bdd, stats} = state
  const bonus = character.classe ? getLevelPointsFromClass(bdd.classes[character.classe], character.level) : 0
  const total = bonus - Object.values(stats).reduce((acc, stat) => acc + stat, 0)

  const statTemplate = Object.keys(initStat())

  const statItems = statTemplate.map(
    (key) =>
      <label>{key + ' : '}
        <input
          type='number'
          value={(stats[key] + character.stats[key])}
          onchange={(e) => changeStat({key: key, event: e})}
          min={character.stats[key]}
          max={stats[key] + character.stats[key] + total}
        />
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
