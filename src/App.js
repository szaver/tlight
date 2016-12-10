const { div } = require('preact-hyperscript')
const { Component } = require('preact')
const io = require('socket.io-client')
const autoBind = require('auto-bind')

const Header = require('./Header')
const Chat = require('./Chat')

const socket = io()
const cameraId = Number(document.location.hash.substr(1))

class App extends Component {
  constructor () {
    super()
    autoBind(this)

    this.state = {
      cameraState: {
        program: 0,
        preview: 0
      },
      messages: []
    }
  }
  componentDidMount () {
    socket.on('update', cameraState => {
      this.setState({cameraState: cameraState})
    })
    socket.on('chat message', msg => this.addMessage(msg))
  }
  addMessage (message) {
    this.setState({messages: [...this.state.messages, message]})
  }
  localMessage (msg) {
    const message = {sender: cameraId, content: msg}
    this.addMessage(message)
    socket.emit('chat message', message)
  }
  render () {
    return div('.appContainer', [
      Header({cameraState: this.state.cameraState, cameraId: cameraId}),
      Chat({messages: this.state.messages, onMessage: this.localMessage})
    ])
  }
}

module.exports = App
