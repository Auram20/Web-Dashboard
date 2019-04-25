import { app } from 'hyperapp'
// import logger from '@hyperapp/logger'

import actions from './actions'
import state from './state'
import view from './components/views/CoursesOverview'

app(
    state,
    actions,
    view,
    document.body
  )
