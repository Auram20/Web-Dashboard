import Infos from '../Infos/Infos'
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

const equipmentHaveLoaded = hasLoaded('equipment')

const classesHaveLoaded = hasLoaded('classes')

const racesHaveLoaded = hasLoaded('races')

export default (state, actions) => {
  if (!equipmentHaveLoaded(state)) {
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
          console.log(resultsArray)
          actions.updateMany(resultsArray)
          console.log('equipment have loaded')
        })
    })
  }

  if (!classesHaveLoaded(state)) {
    actions.load({what: 'classes',
      promise: DnD.getClasses()
        .then((items) => actions.update({data: items, what: 'classes'}))
    })
  }

  if (!racesHaveLoaded(state)) {
    actions.load({what: 'races',
      promise: DnD.getRaces()
        .then((items) => actions.update({data: items, what: 'races'}))
    })
  }

  return (
    <div>
      <Infos state={state} actions={actions}/>
    </div>
  )
}
