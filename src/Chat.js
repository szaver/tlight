const { div, createComponent } = require('preact-hyperscript')

const Messages = require('./Messages')
const TypeBox = require('./TypeBox')

const Chat = ({messages, onMessage}) => {
  return div('.chat', [
    Messages({messages}),
    TypeBox({onMessage})
  ])
}

module.exports = createComponent(Chat)
