import { h } from 'hyperapp'
import './Inventory.css'
import Select from '../../Select/Select'

export default (props) => {
  const {state, actions} = props
  const Inventory = Select('inventory')

  return (
    <div id="inventory">
      INVENTORY
      <Inventory actions={actions} state={state}>Inventory</Inventory>
      <div class="grid">
        <div class="element" id="firstWeapon">Empty</div>
        <div class="element" id="secondWeapon">Empty</div>
        <div class="element" id="armor">Empty</div>
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
        <div class="element">Empty</div>
        <div class="element">Empty</div>
      </div>
      <p>Weight : <span>0</span></p>
    </div>
  )
}
