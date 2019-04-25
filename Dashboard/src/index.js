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

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
