import { h } from 'hyperapp'
import './Inventory.css'
import Select from '../../Select/Select'

export default (props) => {
  const {state, actions} = props
  const {bdd, inventoryList} = state
  const Inventory = Select('inventory')

  const weightInv = bdd && inventoryList.length ? inventoryList.reduce((acc, inv) => bdd.inventory[inv.value].weight + acc, 0) : 0

  const firstWeapon = state.weapon1.value ? bdd.weapons[state.weapon1.value] : null
  const secondWeapon = state.weapon2.value ? bdd.weapons[state.weapon2.value] : null
  const armor = state.armor.value ? bdd.armors[state.armor.value] : null

  const firstWeaponDiv = <div className="element" id="firstWeapon">{firstWeapon ? firstWeapon.name : 'Weapon1'}</div>
  const secondWeaponDiv = <div className="element" id="secondWeapon">{secondWeapon ? secondWeapon.name : 'Weapon2'}</div>
  const armorDiv = <div className="element" id="armor">{armor ? armor.name : 'Armor'}</div>

  const firstWeaponWeight = firstWeapon ? firstWeapon.weight : 0
  const secondWeaponWeight = secondWeapon ? secondWeapon.weight : 0
  const armorWeight = armor ? armor.weight : 0

  const weight = weightInv + firstWeaponWeight + secondWeaponWeight + armorWeight

  return (
    <div id="inventory">
      INVENTORY
      <Inventory onchange={(e) => actions.change({value: e.target.value, what: 'inventory'})} state={state}>Inventory</Inventory>
      <button type="button" onclick={actions.addToInvList}> Ajouter </button>
      <div className="grid">
        {firstWeaponDiv}
        {secondWeaponDiv}
        {armorDiv}
        {
          inventoryList.map((inv, index) => inventoryList.map((item) => item.value).indexOf(inv.value) === index
            ? <div id={inv.index} className="element" id={inv.id}>
              {bdd.inventory[inv.value].name}  x {inventoryList.filter((item) => item.value === inv.value).length}
              <a className="deleteLink" onclick={() => actions.deleteToInvList(inv.id)}>X</a>
            </div>
            : null
          )
        }
      </div>
      <p>Weight : <span>{weight}</span></p>
    </div>
  )
}
