import Infos from '../Infos/Infos'
import './App.css'
import { h } from 'hyperapp'
// import * as DnD from '../../../apiDnD/DnD.js'

export default (state, actions) => {
  return (
    <div>
      <Infos state={state} actions={actions}/>
    </div>
  )
}
