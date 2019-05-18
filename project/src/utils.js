export const groupBy = (arr, key, transform = (key) => key) => {
  return arr.reduce((acc, item) =>
    item[key] !== undefined
      ? {...acc, [transform(item[key], item)]: acc[transform(item[key], item)] ? [...acc[transform(item[key], item)], item] : [item]}
      : acc,
  {}
  )
}

export const operate = (arr1, arr2, operation = (val1, val2) => val1 + val2) => {
  if (!(arr1 instanceof Array) || !(arr2 instanceof Array) || arr1.length !== arr2.length) {
    return []
  }

  return arr1.map((item, index) => operation(item, arr2[index]))
}

export const operateAll = (arr, operation = (val1, val2) => val1 + val2) => {
  if (!(arr instanceof Array) || arr.length === 0) {
    return []
  }

  const lengthOfFirstElement = arr[0].length

  const check = arr.reduce((acc, array) => ({
    ...acc,
    areArrays: (array instanceof Array) && acc.areArrays,
    haveSameLength: (array.length === acc.length) && acc.haveSameLength
  }), {areArrays: true, haveSameLength: true, length: lengthOfFirstElement})

  if (!check.areArrays) {
    console.error('are Not Arrays')
    return []
  }

  if (!check.haveSameLength) {
    console.error('does not have the same length')
    return []
  }

  if (check.length === 0) {
    console.error('contains empty array')
    return []
  }

  return arr.slice(1).reduce((acc, array) => operate(acc, array, operation), arr[0])
}

export const clampLeft = (a, b) => parseInt(parseInt(b) < parseInt(a) ? a : b)
export const clampRight = (a, b) => parseInt(parseInt(a) < parseInt(b) ? a : b)
export const clamp = (a, b, c) => clampRight(b, clampLeft(a, c))

export const initStat = (arr) => {
  if (!(arr instanceof Array) || arr.length !== 6) {
    return initStat(new Array(6).fill(0))
  }

  return ({
    STR: arr[0],
    DEX: arr[1],
    CON: arr[2],
    INT: arr[3],
    WIS: arr[4],
    CHA: arr[5]
  })
}

export const indexOfStat = (stat) => {
  return Object.keys(initStat()).indexOf(stat)
}

export const getLevelPointsFromClass = (classe, to = 20) => {
  const arr = classe.levels.slice(0, to)
  return arr.reduce((acc, level) => acc + level['ability_score_bonuses'], 0)
}

export const barTemplate = (data, text) => ({
  type: 'bar',
  data: {
    labels: data.labels,
    datasets: [{
      label: 'You',
      backgroundColor: ['#8d0000', '#181717', '#2b2a2a', '#656464', '#d4d4d4', '#ffffff'],
      borderColor: 'rgb(255, 255, 255)',
      data: data.values
    }]
  },
  options: {
    legend: {
      display: false
    },
    title: {
      display: text,
      fontColor: '#181717',
      text: text
    },
    scales: {
      yAxes: [{
        gridLines: {
          color: '#181717'
        },
        ticks: {
          fontColor: '#181717',
          min: 0,
          max: 20,
          stepSize: 5
        }
      }],
      xAxes: [{
        gridLines: {
          color: '#181717'
        },
        ticks: {
          fontColor: '#181717'
        }
      }]
    }
  }
})

export const radarTemplate = (data, text) => ({
  type: 'radar',
  data: {
    labels: data.labels,
    datasets: [{
      label: 'You',
      backgroundColor: '#8d0000',
      borderColor: 'rgb(255, 255, 255)',
      data: data.values
    }]
  },
  options: {
    legend: {
      display: false
    },
    title: {
      fontColor: '#181717',
      display: text,
      text: text
    },
    scale: {
      gridLines: {
        color: '#181717'
      },
      angleLines: {
        color: '#181717'
      },
      ticks: {
        fontColor: '#181717',
        min: 0,
        max: 20,
        stepSize: 5
      }
    }
  }
})

export const isShield = (weapon) => {
  if (weapon) {
    return weapon.name === 'Shield'
  }
  return false
}

export const armorValue = (armor, dexValue = 0) => {
  if (armor) {
    const armorClass = armor.armor_class
    const base = parseInt(armorClass.base)
    if (armorClass.dex_bonus) {
      return base + clampRight(dexValue, armorClass.max_bonus === null ? 1000 : armorClass.max_bonus)
    }
    return base
  }
  return 0
}

export const getStats = (state) => {
  const {character, bdd} = state
  const conRacePoint = character.race ? bdd.races[character.race]['ability_bonuses'][indexOfStat('CON')] : 0
  const classPoint = character.classe ? bdd.classes[character.classe].hit_die : 0
  const conCharPoint = character.stats['CON'] + state.stats['CON']
  const pv = classPoint + conCharPoint + conRacePoint

  const dexRacePoint = character.race ? bdd.races[character.race]['ability_bonuses'][indexOfStat('DEX')] : 0
  const dexCharPoint = character.stats['DEX'] + state.stats['DEX']

  const firstWeapon = state.weapon1.value ? bdd.weapons[state.weapon1.value] : null
  const secondWeapon = state.weapon2.value ? bdd.weapons[state.weapon2.value] : null
  const armor = state.armor.value ? bdd.armors[state.armor.value] : null

  const shield = isShield(firstWeapon) || isShield(secondWeapon) ? 2 : 0
  const armorClassValue = armorValue(armor, dexRacePoint + dexCharPoint)

  return ({pv, armorClassValue, shield})
}
