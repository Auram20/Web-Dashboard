import { h } from 'hyperapp'
import Chart from 'chart.js'
import './Charts.css'

export default (props) => {
  const {chart, id} = props

  if (!chart) {
    return null
  }

  const onLoad = (element) => {
    const ctx = element.getContext('2d')
    const myNewChart = new Chart(ctx, chart)
  }

  const onUpdate = (element) => {
    const parent = element.parentNode
    const el =
      element.tagName === 'CANVAS'
        ? element
        : parent.querySelector('canvas')

    const clone = el.cloneNode(true)
    parent.replaceChild(clone, el) // remove all event listeners
    const myNewChart = new Chart(clone.getContext('2d'), chart)
  }

  return (
    <div className={'charts'} id={id}>
      <canvas width={500} height={500} oncreate={onLoad} onupdate={onUpdate} />
    </div>
  )
}
