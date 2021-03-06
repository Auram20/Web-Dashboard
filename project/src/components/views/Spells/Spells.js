import { h } from 'hyperapp'
import './Spells.css'

export default (props) => {
  const {state, actions} = props
  const {character, spells, bdd} = state
  const {level, spellList} = spells

  const spellTabs = new Array(9).fill(0).map((item, index) => <button class="SpellsButton" onclick={() => actions.changeSpellTab(index + 1)}> {index + 1}</button>)

  const indexedSpells = bdd.spells ? bdd.spells[level].map((item, index) => ({item, index})) : []
  const spellForClass = indexedSpells.length && character.classe
    ? indexedSpells.filter(
      ({item}) => item.classes.reduce((acc, classe) => acc || classe.name === bdd.classes[character.classe].name, false)
    )
    : []
  const spellItems = spellForClass.map(({item, index}) => {
    const className = spellList[level].indexOf(index) !== -1 ? 'enabled' : 'disabled'
    const onClick = spellList[level].indexOf(index) !== -1 ? () => actions.removeFromSpellList(index) : () => actions.addToSpellList(index)
    return <div className={'Spell ' + className} onclick={onClick} >{item.name}</div>
  })

  return (
    <div id="spells">
      SPELLS
      <nav>
        <button class="SpellsButton2" onclick={() => actions.changeSpellTab(0)}>Cantrips</button>
        {spellTabs}
      </nav>
      {spellItems.length ? spellItems : <div>No Spell Available</div>}
    </div>
  )
}
