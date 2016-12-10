const { div, createComponent } = require('preact-hyperscript')

const Messages = ({messages}) => {
  return div('.msgs', [
    div('.msgs__inner', messages.map(msg => {
      return div('.msgs__msgc', [
        div('.msgs__id', msg.sender),
        div('.msgs__msg', msg.content)
      ])
    }))
  ])
}

module.exports = createComponent(Messages)
