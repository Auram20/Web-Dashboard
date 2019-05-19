import './Popup.css'
import { h } from 'hyperapp'

export default (props) => {
  const {actions} = props

  return (
    <div id="mypopup">
      <img src="https://www.icone-png.com/png/7/7015.png" id="warning"> </img>
      <h4>Pour pouvoir utiliser ce Dashboard en ligne , nous vous conseillons d'utiliser Firefox en ayant téléchargé l'extension suivante : </h4>
      <a href="https://addons.mozilla.org/fr/firefox/addon/access-control-allow-origin/" target="_blank"><img src="http://kernelreloaded.com/content/images/2017/10/firefox-extensions-6.png" id="extension"> </img></a>
      <h3>Autrement télécharger le dossier sur :  </h3>
      <a href="https://github.com/Auram20/Web-Dashboard" target="_blank"><img src="https://git-scm.com/images/logos/downloads/Git-Logo-White.png" id="gitlink"> </img></a>
      <h3> et lancer le serveur localhost:3000 avec "npm install && npm start" sur le terminal en se plaçant dans le dossier project</h3>
      <button type="button" id="buttonexit"> Fermer le pop-up </button>
    </div>
  )
}
