import Infos from '../Infos/Infos'
import Charts from '../Charts/Charts'
import Specs from '../Stats/Specs'
import Stats from '../Stats/Stats'
import Skills from '../Stats/Skills'
import Inventory from '../Inventory/Inventory'
import Spells from '../Spells/Spells'
import './App.css'
import { h } from 'hyperapp'
import * as DnD from '../../../apiDnD/DnD.js'

const groupBy = (arr, key, transform = (key) => key) => {
  return arr.reduce((acc, item) =>
    item[key]
      ? {...acc, [transform(item[key])]: acc[transform(item[key])] ? [...acc[transform(item[key])], item] : [item]}
      : acc,
  {}
  )
}

const hasLoaded = (smthg) => (state) => {
  return true && state.load[smthg]
}

const loadCategory = (category, state, actions) => {
  if (!hasLoaded(category)(state)) {
    actions.load({what: category,
      promise: DnD.getDetailedRessource(category)
        .then((items) => actions.update({data: items, what: category}))
    })
  }
}

const loadEquipment = (state, actions) => {
  if (!hasLoaded('equipment')(state)) {
    actions.load({what: 'equipment',
      promise: DnD.getEquipment()
        .then((items) => {
          const groups = groupBy(items, 'equipment_category', (key) => {
            switch (key) {
              case ('Weapon'):
                return 'weapons'
              case ('Armor'):
                return 'armors'
              default:
                return 'inventory'
            }
          })
          const resultsArray = Object.keys(groups).map((key) => ({data: groups[key], what: key}))
          actions.updateMany(resultsArray)
        })
    })
  }
}

export default (state, actions) => {
  loadEquipment(state, actions)
  loadCategory('classes', state, actions)
  loadCategory('races', state, actions)
  loadCategory('ability-scores', state, actions)

  const specsCharacter = Object.keys(state.character.specs).length
    ? {labels: state.bdd['ability-scores'].map((item) => item.name), data: state.character.specs}
    : {labels: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'], data: new Array(6).fill(0)}

  return (
    <main>
      <Infos state={state} actions={actions}/>
      <Charts type='radar' data={specsCharacter} label='Specs' id="chart1" />
      <Charts type='bar' data={specsCharacter} label='STATS' id="chart2" />
      <Charts type='bar' data={specsCharacter} label='SKILLS' id="chart3" />
      <Specs />
      <Stats />
      <Skills />
      <canvas></canvas>
      <Inventory />
      <canvas></canvas>
      <Spells />
    </main>
  )
}
