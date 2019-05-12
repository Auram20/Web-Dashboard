import {initStat} from '../utils'

export default {
  load: {},
  character: {
    stats: initStat(new Array(6).fill(8)),
    level: 1,
    weapon1: null,
    weapon2: null,
    armor: null,
    race: null,
    classe: null,
    inventory: []
  },
  stats: initStat(new Array(6).fill(0)),
  armor: {
    input: '',
    value: null
  },
  weapon1: {
    input: '',
    value: null
  },
  weapon2: {
    input: '',
    value: null
  },
  inventory: {
    input: null
  },
  skillList: [],
  inventoryList: [],
  spells: {
    spellList: new Array(10).fill([]),
    level: 0
  }
}
