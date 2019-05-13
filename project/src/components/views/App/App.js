import Infos from '../Infos/Infos'
import Charts from '../Charts/Charts'
import Specs from '../Stats/Specs'
import Stats from '../Stats/Stats'
import Skills from '../Stats/Skills'
import Inventory from '../Inventory/Inventory'
import Spells from '../Spells/Spells'
import './App.css'
import { h } from 'hyperapp'
import init from '../../../init.js'
import {barTemplate, radarTemplate, operateAll, operate, indexOfStat} from '../../../utils'

const abilityBasis = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

const getSkillAbilities = (bdd, skills) =>
  bdd.skills.length
    ? skills.reduce((acc, item) => {
      const index = indexOfStat(bdd.skills[item].ability_score.name)
      return [...acc.slice(0, index), acc[index] + 1, ...acc.slice(index + 1, 6)]
    }, new Array(6).fill(0))
    : []

export default (state, actions) => {
  init(state, actions)

  const {stats} = state
  const charStats = state.character.stats

  const specs = state.character.race ? state.bdd.races[state.character.race]['ability_bonuses'] : new Array(6).fill(0)

  const specsCharacter = {
    labels: abilityBasis,
    values: specs
  }

  const allStatsCharacter = {
    labels: abilityBasis,
    values: operateAll([Object.values(stats), Object.values(charStats), specs])
  }

  const skillsAbility = {
    labels: abilityBasis,
    values: operate(getSkillAbilities(state.bdd, state.skillList), new Array(6).fill(state.skillList.length), (val1, val2) => val2 !== 0 ? val1 / val2 : 0)
  }

  const skillsBarTemplate = barTemplate(skillsAbility, 'Skills')
  const skillsChart = {
    ...skillsBarTemplate,
    options: {
      ...skillsBarTemplate.options,
      scales: {
        yAxes: [{
          gridLines: {
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "white",
            min: 0,
            max: 1,
            stepSize: 0.1
          }
        }],
        xAxes: [{
          gridLines: {
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "white"
          }
        }]
      }
    }
  }

  return (
    <main>
      <Infos state={state} actions={actions}/>
      <Charts key={0} chart={barTemplate(specsCharacter, 'Specs')} id="chart1"/>
      <Charts key={1} chart={radarTemplate(allStatsCharacter, 'Stats')} id="chart2"/>
      <Charts key={3} chart={skillsChart} id="chart3"/>
      <Specs state={state} changeStat={actions.changeStat} />
      <Stats state={state}/>
      <Skills state={state} actions={actions}/>
      <Inventory state={state} actions={actions} />
      <Spells state={state} actions={actions} />
    </main>
  )
}
