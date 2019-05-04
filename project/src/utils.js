export const groupBy = (arr, key, transform = (key) => key) => {
  return arr.reduce((acc, item) =>
    item[key]
      ? {...acc, [transform(item[key])]: acc[transform(item[key])] ? [...acc[transform(item[key])], item] : [item]}
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

export const clampLeft = (a, b) => parseInt(parseInt(b) < parseInt(a) ? a : b)
export const clampRight = (a, b) => parseInt(parseInt(a) < parseInt(b) ? a : b)
export const clamp = (a, b, c) => clampRight(b, clampLeft(a, c))

export const initStat = (arr) => {
  if (!(arr instanceof Array)) {
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
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#1d15da'],
      borderColor: 'rgb(255, 99, 132)',
      data: data.values
    }]
  },
  options: {
    legend: {
      display: false
    },
    title: {
      display: text,
      text: text
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 5,
          stepSize: 1
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
      backgroundColor: 'red',
      borderColor: 'rgb(255, 99, 132)',
      data: data.values
    }]
  },
  options: {
    legend: {
      display: false
    },
    title: {
      display: text,
      text: text
    },
    scale: {
      ticks: {
        min: 0,
        max: 5,
        stepSize: 1
      }
    }
  }
})
