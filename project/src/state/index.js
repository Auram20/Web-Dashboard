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
  },
  popup: true,
  avatarsList: [
    {
      name: 'Dwarf',
      url: 'http://media.wizards.com/2015/images/dnd/resources/Dwarf_Cleric.jpg'
    },
    {
      name: 'Elf',
      url: 'http://media.wizards.com/2015/images/dnd/resources/Wood%20Elf_Ranger.jpg'
    },
    {
      name: 'Halfling',
      url: 'http://media.wizards.com/2015/images/dnd/resources/Halfling-Rogue.jpg'
    },
    {
      name: 'Human',
      url: 'http://media.wizards.com/2015/images/dnd/resources/Human_Fighter.jpg'
    },
    {
      name: 'Dragonborn',
      url: 'http://media.wizards.com/2015/images/dnd/resources/Dragonborn_Sorceror.jpg'
    },
    {
      name: 'Gnome',
      url: 'https://zupimages.net/up/19/20/eces.png'
    },
    {
      name: 'Half-Elf',
      url: 'http://media.wizards.com/2015/images/dnd/resources/HalfElf_Bard3.jpg'
    },
    {
      name: 'Half-Orc',
      url: 'http://media.wizards.com/2015/images/dnd/resources/HalfOrc_Paladin.jpg'
    },
    {
      name: 'Tiefling',
      url: 'http://media.wizards.com/2015/images/dnd/resources/Tiefling_Warlock.png'
    }
  ]
}
