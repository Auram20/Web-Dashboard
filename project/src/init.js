import {groupBy} from './utils.js'
import * as DnD from './apiDnD/DnD.js'

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

const loadLevelClass = (actions) => (obj) => {
  obj.promise
    .then(
      (levelsClass) =>
        levelsClass.map((levels, index) => ({...obj.items[index], levels: levels}))
    )
    .then((items) => actions.update({data: items, what: 'classes'}))
}

const loadClasses = (state, actions) => {
  if (!hasLoaded('classes')(state)) {
    actions.load({what: 'classes',
      promise: DnD.getDetailedRessource('classes')
        .then((items) => ({items: items, promise: Promise.all(items.map(({name}) => DnD.getLevels(name.toLowerCase())))}))
        .then(loadLevelClass(actions))
    })
  }
}

const loadEquipment = (state, actions) => {
  if (!hasLoaded('equipment')(state)) {
    actions.load({what: 'equipment',
      promise: DnD.getEquipment()
        .then((items) => {
          const groups = groupBy(items, 'equipment_category', (key, item) => {
            switch (key) {
              case ('Weapon'):
                return 'weapons'
              case ('Armor'):
                if (item.name === 'Shield') {
                  return 'weapons'
                }
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
  loadClasses(state, actions)
  loadCategory('races', state, actions)
  loadCategory('ability-scores', state, actions)
  loadCategory('spells', state, actions)
  loadCategory('skills', state, actions)
}
