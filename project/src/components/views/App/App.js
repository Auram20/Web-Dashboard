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
import {barTemplate, radarTemplate, operateAll} from '../../../utils'

export default (state, actions) => {
  init(state, actions)

  const {stats} = state
  const charStats = state.character.stats

  const specs = state.character.race ? state.bdd.races[state.character.race]['ability_bonuses'] : new Array(6).fill(0)

  const specsCharacter = {
    labels: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
    values: specs
  }

  const allStatsCharacter = {
    labels: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
    values: operateAll([Object.values(stats), Object.values(charStats), specs])
  }

  return (
    <main>
      <Infos state={state} actions={actions}/>
      <Charts key={0} chart={barTemplate(specsCharacter, 'Specs')} id="chart1"/>
      <Charts key={1} chart={radarTemplate(allStatsCharacter, 'Stats')} id="chart2"/>
      <Charts key={3} chart={barTemplate(specsCharacter, 'Skills')} id="chart3"/>
      <Specs state={state} changeStat={actions.changeStat} />
      <Stats state={state}/>
      <Skills />
      <Inventory state={state} actions={actions} />
      <Spells state={state}/>
    </main>
  )
}
