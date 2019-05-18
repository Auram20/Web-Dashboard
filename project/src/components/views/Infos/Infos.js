import './Infos.css'
import { h } from 'hyperapp'
import Select from '../../Select/Select'
import Avatar from '../Avatar/Avatar'
import SearchInput from '../../SearchInput/SearchInput.js'

const canEquip = (bdd, character, item) => {
  if (character.classe !== null) {
    const classe = bdd.classes[character.classe]
    const debugWizard = classe.name === 'Wizard' ? item['weapon_category:'] === 'Simple' : false
    return classe.proficiencies.reduce((acc, {name}) => acc || name.indexOf(item['weapon_category:'] || item.armor_category) !== -1 || debugWizard, false)
  }
  return false
}

const hasOneHandedWeapon = (bdd, equipedWeapon) => {
  if (equipedWeapon !== null) {
    return !bdd.weapons[equipedWeapon].properties.find(({name}) => name === 'Two-Handed')
  }
  return true
}

export default (props) => {
  const {state, actions} = props
  const {bdd, character} = state
  const Races = Select('races')
  const Class = Select('classes')
  const Weapon = SearchInput('weapons')
  const Armor = SearchInput('armors')

  return (
    <div id='info'>
      <h3> D&D CHARACTER SHEET</h3>
      <Avatar state={state}/>
      <input type="text" name="title" placeholder="Name " id="name" class="infochild" />
      <input type="number" name="title" class="infochild" placeholder="Level " min={1} max={20} value={state.character.level} onchange={actions.changeLevel} />

      <Races
        reload={actions.reload}
        state={state} class="infochild"
        onchange={(e) => actions.updateCharacter({what: 'race', value: e.target.value})}
      >Races</Races>
      <Class
        reload={actions.reload}
        state={state} class="infochild"
        onchange={(e) => actions.updateClasse(e.target.value)}
      >Class</Class>
      <Weapon
        actions={actions}
        state={state}
        what={'weapon1'}
        class="infochild"
        id="search"
        filter={({item}) => canEquip(bdd, character, item) && hasOneHandedWeapon(bdd, state.weapon2.value)}
        message={!hasOneHandedWeapon(bdd, state.weapon2.value) && <span>Two-Handed Equipped</span>}
      >Main Hand</Weapon>
      <Weapon
        actions={actions}
        state={state}
        what={'weapon2'}
        class="infochild"
        id="search"
        filter={({item}) => canEquip(bdd, character, item) && hasOneHandedWeapon(bdd, state.weapon1.value)}
        message={!hasOneHandedWeapon(bdd, state.weapon1.value) && <span>Two-Handed Equipped</span>}
      >Secondary Hand</Weapon>
      <Armor
        actions={actions}
        state={state}
        what={'armor'}
        class="infochild"
        id="search"
        filter={({item}) => canEquip(bdd, character, item)}
      >Armor</Armor>
      <img src="https://flaticons.net/icons/User%20Interface/Print.png" id="printicon" onclick={() => window.print()} > </img>
    </div>
  )
}
