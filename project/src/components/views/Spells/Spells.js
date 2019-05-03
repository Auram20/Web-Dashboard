import { h } from 'hyperapp'
import './Spells.css'
import SpellItem from './SpellItem'
import SearchInput from '../../SearchInput/SearchInput'

export default (props) => {
  const {state, actions} = props
  const {spellList} = state

  const Spell = SearchInput('spells')

  const items = spellList ? spellList.map((item, index) => <SpellItem key={index} spellData={item} />) : null

  return (
    <div id="spells">
      SPELLS
      <Spell actions={actions} state={state} what={'spells'}>Spell</Spell>
      <div class="gridSpells">
        {items}
      </div>
    </div>
  )
}
