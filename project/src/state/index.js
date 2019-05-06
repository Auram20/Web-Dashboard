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
    input: ''
  },
  weapon1: {
    input: ''
  },
  weapon2: {
    input: ''
  },
  inventory: {
    input: ''
  },
  spells: {
    input: ''
  },
  InventoryList: []
}
