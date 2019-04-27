import './Infos.css'
import { h } from 'hyperapp'
import Select from '../../Select/Select'

// DnD a besoin d'une fonction de callback à mettre dans then

export default (props) => {
  const {state, actions} = props
  const Races = Select('races')

  return (
    <div>
      <img src="http://www.alluserpics.com/data/media/16/music_pinguin.jpg" alt="Logo" />
      <input type="text" name="title" value="Name " />
      <input type="text" name="title" value="Level " />

      <Races reload={actions.reload} state={state}>Races</Races>

      <select>
        <option value="equipements" selected disabled hidden>Alignement</option>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
      </select>

    </div>
  )
}
