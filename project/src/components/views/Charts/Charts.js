import { h } from 'hyperapp'
import Chart from 'chart.js'
import './Charts.css'

export default (props) => {
  const {type, data, label} = props

  if (!data || !type) {
    return null
  }

  console.log(data)

  const onLoad = (element) => {
    const ctx = element.getContext('2d')
    const options = {

    }

    const myRadarChart = new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: [{
          label: label,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(255, 99, 132)',
          data: data.value
        }]
      },
      options: options
    })
  }

  return (
    <div className={'charts'}>
      <canvas width={500} height={500} oncreate={onLoad} />
    </div>
  )
}
