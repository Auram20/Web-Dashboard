import { app } from 'hyperapp'
// import logger from '@hyperapp/logger'

import actions from './actions'
import state from './state'
import bdd from 'apiDnD/BDD'
import view from './components/views/App/App'

app(
  {...state, bdd},
  actions,
  view,
  document.body
)
