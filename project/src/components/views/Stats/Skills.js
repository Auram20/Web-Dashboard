import { h } from 'hyperapp'
import './Stats.css'

export default (props) => {
  const {state, actions} = props
  const {character, bdd} = state

  const proficiencyChoices = character.classe ? bdd.classes[character.classe].proficiency_choices[0] : null

  const choiceNumber = proficiencyChoices ? proficiencyChoices.choose : 0
  const skillsClass = proficiencyChoices ? proficiencyChoices.from.map((skill) => skill.name.replace('Skill: ', '')) : []

  const indexedSkills = bdd.skills.length ? bdd.skills.map((item, index) => ({item, index})) : []
  const skills = indexedSkills.length ? indexedSkills.filter(({item}) => skillsClass.indexOf(item.name) !== -1) : []

  const skillItems = skills.map(({item, index}) => {
    const button = state.skillList.indexOf(index) !== -1 ? <button class="SkillsButton" onclick={() => actions.removeFromSkillList(index)}>-</button> : <button class="SkillsButton" onclick={() => actions.addToSkillList(index)}>+</button>
    const className = state.skillList.indexOf(index) !== -1 ? 'enabled' : 'disabled'
    return <div className={'SkillItem ' + className} data-value={index} key={index}>{item.name} {button}</div>
  })

  return (
    <div>
      <div id="skillsArea">
        {skillItems}
      </div>
    </div>
  )
}
