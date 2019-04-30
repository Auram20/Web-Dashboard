import { h } from 'hyperapp'
import './Stats.css'

export default () => {
  return (
    <div class='stats'>
      <div class='first'>
        <p>STREN   : 00 </p>
        <p>DEXTE    : 00 </p>
        <p>INTELL   : 00 </p>
      </div>
      <div class='second'>
        <p>CONST    : 00</p>
        <p>WISDO    : 00</p>
        <p>CHAR     : 00</p>
      </div>
    </div>
  )
}
