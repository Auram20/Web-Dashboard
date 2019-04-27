import '../../../styles/infos.css'
import { h } from 'hyperapp'
// import * as DnD from '../../request/DnD.js'

// DnD a besoin d'une fonction d'une fonction de callback

export default (/* state, actions */) => {
  return (
    <div>
      <img src="http://www.alluserpics.com/data/media/16/music_pinguin.jpg" alt="Logo" />
      <input type="text" name="title" value="Name " />
      <input type="text" name="title" value="Level " />
      
      <select>
        <option value="equipements" selected disabled hidden>Race</option>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
      </select>

      <select>
        <option value="equipements" selected disabled hidden>Sexe</option>
        <option value="grapefruit">F</option>
        <option value="lime">M</option>
      </select>

      <select>
        <option value="equipements" selected disabled hidden>Alignement</option>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
      </select>
      
    </div>
  )
}
