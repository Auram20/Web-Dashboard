import './Infos.css'
import { h } from 'hyperapp'
import Select from '../../Select/Select'
import SearchInput from '../../SearchInput/SearchInput.js'

export default (props) => {
  const {state, actions} = props
  const Races = Select('races')
  const Skills = Select('skills')
  const Class = Select('classes')
  const Weapon = SearchInput('weapons')
  const Armor = SearchInput('armors')

  return (
    <div>
      <img src="http://www.alluserpics.com/data/media/16/music_pinguin.jpg" alt="Logo" />
      <input type="text" name="title" value="Name " />
      <input type="text" name="title" value="Level " />

      <Races reload={actions.reload} state={state}>Races</Races>
      <Class reload={actions.reload} state={state}>Class</Class>
      <Skills reload={actions.reload} state={state}>Skills</Skills>
      <Weapon actions={actions} state={state} what={'weapon1'}>Main Hand</Weapon>
      <Weapon actions={actions} state={state} what={'weapon2'}>Secondary Hand</Weapon>
      <Armor actions={actions} state={state} what={'armor'}>Armor</Armor>

    </div>
  )
}
