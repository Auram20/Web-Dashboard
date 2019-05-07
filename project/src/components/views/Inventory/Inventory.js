import { h } from 'hyperapp'
import './Inventory.css'
import Select from '../../Select/Select'

export default (props) => {
  const {state, actions} = props
  const Inventory = Select('inventory')

  return (
    <div id="inventory">
      INVENTORY
      <Inventory onchange={(e) => actions.change({event: e, what: 'inventory'})} state={state}>Inventory</Inventory>
      <button type="button" onclick={() => actions.addToInvList()}> Ajouter </button>
      <div class="grid">
        <div class="element" id="firstWeapon">Weapon 1</div>
        <div class="element" id="secondWeapon">Weapon 2</div>
        <div class="element" id="armor"> Armor </div>
        {
          state.InventoryList.map(inv => <div id={inv.index} class="element" id={inv.id} content={inv.content}>
            {inv.content}
            <a class="deleteLink"onclick={() => actions.deleteToInvList(inv.id)}>X</a>
          </div>)
        }
      </div>
      <p>Weight : <span>0</span></p>
    </div>
  )
}
