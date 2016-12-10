const { textarea, createComponent } = require('preact-hyperscript')

const TypeBox = ({ onMessage }) => {
  const handleType = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const msg = e.target.value
      e.target.value = ''
      onMessage(msg)
    }
  }

  return textarea('.typeBox', {onKeyDown: handleType})
}

module.exports = createComponent(TypeBox)
