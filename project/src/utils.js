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

export const STAT = {
  arr: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
  STR: 0,
  DEX: 1,
  CON: 2,
  INT: 3,
  WIS: 4,
  CHA: 5
}

export const barTemplate = (data, text) => ({
  type: 'bar',
  data: {
    labels: data.labels,
    datasets: [{
      label: '1',
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#1d15da'],
      borderColor: 'rgb(255, 99, 132)',
      data: data.values
    }]
  },
  options: {
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
      label: '1',
      backgroundColor: 'red',
      borderColor: 'rgb(255, 99, 132)',
      data: data.values
    }]
  },
  options: {
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
