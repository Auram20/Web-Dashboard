import './Infos.css'
import { h } from 'hyperapp'
import Select from '../../Select/Select'
import SearchInput from '../../SearchInput/SearchInput.js'
import * as DnD from '../../../apiDnD/DnD.js'

export default (props) => {
  const {state, actions} = props
  const Races = Select('races')
  const Skills = Select('skills')
  const Class = Select('classes')
  const Equipment = SearchInput(DnD.getEquipment('Weapon'))
  const Equipment2 = SearchInput(DnD.getEquipment('Armor'))

  return (
    <div>
      <img src="http://www.alluserpics.com/data/media/16/music_pinguin.jpg" alt="Logo" />
      <input type="text" name="title" value="Name " />
      <input type="text" name="title" value="Level " />

      <Races reload={actions.reload} state={state}>Races</Races>
      <Class reload={actions.reload} state={state}>Class</Class>
      <Skills reload={actions.reload} state={state}>Skills</Skills>
      <Equipment actions={actions} state={state['equipment']}>First Weapon</Equipment>
      <Equipment actions={actions} state={state['equipment']}>Second Weapon</Equipment>
      <Equipment2 actions={actions} state={state['equipment']}>Armor</Equipment2>

    </div>
  )
}
