import Infos from '../Infos/Infos'
import Charts from '../Charts/Charts'
import Specs from '../Stats/Specs'
import Stats from '../Stats/Stats'
import Skills from '../Stats/Skills'
import Inventory from '../Inventory/Inventory'
import Spells from '../Spells/Spells'
import './App.css'
import { h } from 'hyperapp'
import init from '../../../init'

export default (state, actions) => {
  init(state, actions)

  const specsCharacter = {
    labels: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
    values: state.character.race ? state.bdd.races[state.character.race]['ability_bonuses'] : new Array(6).fill(0)
  }

  const chartSpecs = {
    type: 'bar',
    data: {
      labels: specsCharacter.labels,
      datasets: [{
        label: '1',
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#1d15da'],
        borderColor: 'rgb(255, 99, 132)',
        data: specsCharacter.values
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Specs'
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
  }

  return (
    <main>
      <Infos state={state} actions={actions}/>
      <Charts chart={chartSpecs} id="chart1"/>
      <Charts id="chart2"/>
      <Charts id="chart3"/>
      <Specs />
      <Stats character={state.character}/>
      <Skills />
      <Inventory state={state} actions={actions} />
      <Spells state={state}/>
    </main>
  )
}
