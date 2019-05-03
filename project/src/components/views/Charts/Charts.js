import { h } from 'hyperapp'
import Chart from 'chart.js'
import './Charts.css'

export default (props) => {
  const {chart} = props

  if (!chart) {
    return null
  }

  const onLoad = (element) => {
    const ctx = element.getContext('2d')
    const myNewChart = new Chart(ctx, chart)
  }

  const onUpdate = (element) => {
    const ctx =
      element.tagName === 'CANVAS'
        ? element.getContext('2d')
        : element.parentNode.getElementsByTagName('canvas')[0].getContext('2d')

    const myNewChart = new Chart(ctx, chart)
  }

  return (
    <div className={'charts'}>
      <canvas width={500} height={500} oncreate={onLoad} onupdate={onUpdate} />
    </div>
  )
}
