import Infos from '../Infos/Infos'
import Charts from '../Charts/Charts'
import Specs from '../Stats/Specs'
import Stats from '../Stats/Stats'
import Skills from '../Stats/Skills'

import Popup from '../Popup/Popup'
import Inventory from '../Inventory/Inventory'
import Spells from '../Spells/Spells'
import './App.css'
import './Responsive.css'
import { h } from 'hyperapp'
import init from '../../../init.js'
import {barTemplate, radarTemplate, operateAll, operate, indexOfStat, getStats} from '../../../utils'

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
  const {pv, armorClassValue, shield} = getStats(state)
  const specs = state.character.race ? state.bdd.races[state.character.race]['ability_bonuses'] : new Array(6).fill(0)

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
            color: '#181717'
          },
          ticks: {
            fontColor: '#181717',
            min: 0,
            max: 1,
            stepSize: 0.1
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
  }

  const specsCharacter = {
    labels: ['PV', 'CA Armor', 'CA Shield'],
    values: [pv, armorClassValue, shield]
  }

  return (
    <main>
      <Popup />
      <div id="Infodiv">
        <Infos state={state} actions={actions}/>
      </div>
      <div id="Dashboarddiv">
        <Charts chart={radarTemplate(allStatsCharacter, 'Stats')} id="chart1"/>
        <Charts chart={skillsChart} id="chart2"/>
        <Charts chart={barTemplate(specsCharacter, 'Specs')} id="chart3"/>
        <Stats state={state}/>
        <Specs state={state} changeStat={actions.changeStat} />
        <Skills state={state} actions={actions}/>
        <Inventory state={state} actions={actions} />
        <Spells state={state} actions={actions} />
      </div>
    </main>
  )
}
