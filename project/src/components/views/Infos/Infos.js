import './Infos.css'
import { h } from 'hyperapp'
import Select from '../../Select/Select'
import SearchInput from '../../SearchInput/SearchInput.js'
import * as DnD from '../../../apiDnD/DnD.js'

export default (props) => {
  const {state, actions} = props
  const Races = Select('races')
  const Skills = Select('skills')
  const Equipment = SearchInput(DnD.getEquipment('Weapon'))

  return (
    <div>
      <img src="http://www.alluserpics.com/data/media/16/music_pinguin.jpg" alt="Logo" />
      <input type="text" name="title" value="Name " />
      <input type="text" name="title" value="Level " />

      <Races reload={actions.reload} state={state}>Races</Races>
      <Skills reload={actions.reload} state={state}>Skills</Skills>
      <Equipment actions={actions} state={state['equipment']} />

      <select>
        <option value="equipements" selected disabled hidden>Alignement</option>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
      </select>

    </div>
  )
}
