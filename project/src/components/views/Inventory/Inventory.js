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
        <div class="element" id="firstWeapon">Empty</div>
        <div class="element" id="secondWeapon">Empty</div>
        <div class="element" id="armor">Empty</div>
        <div class="element" id="elt1">My dynamic content</div>
        <div class="element" id="elt2">My dynamic content 2</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
        <div class="element">Empty</div>
      </div>
      <p>Weight : <span>0</span></p>
    </div>
  )
}
