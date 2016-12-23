import './theme/theme.scss'

const inputs = document.getElementsByClassName('input-field')

for (let i = 0; i < inputs.length; i++) {
  const focus = () => {
    if(!inputs[i].classList.contains('active')) {
      inputs[i].classList.add('active')
    }
  }
  const blur = () => {
    if(inputs[i].classList.contains('active')) {
      inputs[i].classList.remove('active')
    }
  }
  inputs[i].lastElementChild.addEventListener('focus', focus)
  inputs[i].lastElementChild.addEventListener('change', () => {
    if(inputs[i].lastElementChild.value) {
      inputs[i].lastElementChild.removeEventListener('blur', blur)
    } else {
      inputs[i].lastElementChild.removeEventListener('blur', blur)
      inputs[i].lastElementChild.addEventListener('blur', blur)
    }
  })
  inputs[i].lastElementChild.addEventListener('blur', blur)
}
