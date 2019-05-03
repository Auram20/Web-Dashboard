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
