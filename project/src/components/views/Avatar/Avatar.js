import './Avatar.css'
import { h } from 'hyperapp'

export default (props) => {
  const {state} = props

  return (
    <div>
      {
        state.bdd.races.length && state.character.race && <img src={state.avatarsList.filter(avatar => avatar.name === state.bdd.races[state.character.race].name)[0].url} id="avatar" alt="Logo" />
      }
    </div>
  )
}
