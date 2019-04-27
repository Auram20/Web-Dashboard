import Infos from '../Infos/Infos'
import './App.css'
import { h } from 'hyperapp'
// import * as DnD from '../../request/DnD.js'

// DnD a besoin d'une fonction de callback

export default (state, actions) => {
  return (
    <div>
      <Infos state={state} actions={actions}/>
    </div>
  )
}
