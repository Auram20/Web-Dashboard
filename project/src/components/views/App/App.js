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
import {barTemplate, radarTemplate} from '../../../utils'

export default (state, actions) => {
  init(state, actions)

  const specsCharacter = {
    labels: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
    values: state.character.race ? state.bdd.races[state.character.race]['ability_bonuses'] : new Array(6).fill(0)
  }

  return (
    <main>
      <Infos state={state} actions={actions}/>
      <Charts chart={barTemplate(specsCharacter, 'Specs')} id="chart1"/>
      <Charts chart={radarTemplate(specsCharacter, 'Stats')} id="chart2"/>
      <Charts chart={barTemplate(specsCharacter, 'Skills')} id="chart3"/>
      <Specs />
      <Stats character={state.character}/>
      <Skills />
      <Inventory state={state} actions={actions} />
      <Spells state={state}/>
    </main>
  )
}
