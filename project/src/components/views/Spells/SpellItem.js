import { h } from 'hyperapp'

export default (props) => {
  const {spellData} = props

  return (
    <div class="elementSpells">{spellData.name} <span>X</span></div>
  )
}
