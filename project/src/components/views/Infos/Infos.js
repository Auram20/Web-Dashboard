import './Infos.css'
import { h } from 'hyperapp'
import Select from '../../Select/Select'
import Avatar from '../Avatar/Avatar'
import SearchInput from '../../SearchInput/SearchInput.js'

export default (props) => {
  const {state, actions} = props
  const Races = Select('races')
  const Class = Select('classes')
  const Weapon = SearchInput('weapons')
  const Armor = SearchInput('armors')

  return (
    <div id='info'>
      <h3> D&D CHARACTER SHEET</h3>
      <Avatar state={state}/>
      <input type="text" name="title" placeholder="Name " id="name" />
      <input type="number" name="title" placeholder="Level " min={1} max={20} value={state.character.level} onchange={actions.changeLevel} />

      <Races
        reload={actions.reload}
        state={state}
        onchange={(e) => actions.updateCharacter({what: 'race', value: e.target.value})}
      >Races</Races>
      <Class
        reload={actions.reload}
        state={state}
        onchange={(e) => actions.updateClasse(e.target.value)}
      >Class</Class>
      <Weapon actions={actions} state={state} what={'weapon1'} id="search">Main Hand</Weapon>
      <Weapon actions={actions} state={state} what={'weapon2'} id="search">Secondary Hand</Weapon>
      <Armor actions={actions} state={state} what={'armor'} id="search">Armor</Armor>
      <img src="https://www.iconsdb.com/icons/preview/white/printer-xxl.png" id="printicon" onclick={() => window.print()} > </img>
    </div>
  )
}
