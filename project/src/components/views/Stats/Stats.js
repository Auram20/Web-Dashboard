import { h } from 'hyperapp'
import './Stats.css'
import {indexOfStat, clampRight, barTemplate} from '../../../utils'
import Charts from '../Charts/Charts.js'

const isShield = (weapon) => {
  if (weapon) {
    return weapon.name === 'Shield'
  }
  return false
}

const armorValue = (armor, dexValue = 0) => {
  if (armor) {
    const armorClass = armor.armor_class
    const base = parseInt(armorClass.base)
    if (armorClass.dex_bonus) {
      return base + clampRight(dexValue, armorClass.max_bonus === null ? 1000 : armorClass.max_bonus)
    }
    return base
  }
  return 0
}

export default (props) => {
  const {state} = props
  const {character, bdd} = state
  const conRacePoint = character.race ? bdd.races[character.race]['ability_bonuses'][indexOfStat('CON')] : 0
  const classPoint = character.classe ? bdd.classes[character.classe].hit_die : 0
  const conCharPoint = character.stats['CON'] + state.stats['CON']
  const pv = classPoint + conCharPoint + conRacePoint

  const dexRacePoint = character.race ? bdd.races[character.race]['ability_bonuses'][indexOfStat('DEX')] : 0
  const dexCharPoint = character.stats['DEX'] + state.stats['DEX']

  const firstWeapon = state.weapon1.value ? bdd.weapons[state.weapon1.value] : null
  const secondWeapon = state.weapon2.value ? bdd.weapons[state.weapon2.value] : null
  const armor = state.armor.value ? bdd.armors[state.armor.value] : null

  const shield = isShield(firstWeapon) || isShield(secondWeapon) ? 2 : 0
  const armorClassValue = armorValue(armor, dexRacePoint + dexCharPoint)

  const specsCharacter = {
    labels: ['PV', 'CA Armor', 'CA Shield'],
    values: [pv, armorClassValue, shield]
  }

  return (
    <div class='stats2'>
      <Charts chart={barTemplate(specsCharacter, 'Specs')} id="chart1"/>
      <div id="stats2">
        <p>PV : <span>{pv}</span></p>
        <p>CA (Armor) : <span>{armorClassValue}</span></p>
        <p>CA (Shield) : <span>{shield}</span></p>
      </div>
    </div>
  )
}
