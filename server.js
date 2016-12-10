const express = require('express')
const app = express()
const http = require('http').Server(app)
const morgan = require('morgan')
const Atem = require('atem')
const path = require('path')
var io = require('socket.io')(http)

const atem = new Atem('192.168.10.240')

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

const tallyState = {
  program: 0,
  preview: 0
}

const chatMessages = []

const emitUpdate = () => {
  console.log(`emitting update`, tallyState)
  io.emit('update', tallyState)
}

io.on('connection', (socket) => {
  console.log('a client connected')
  emitUpdate()
  chatMessages.forEach(m => socket.emit('chat message', m))

  socket.on('chat message', message => {
    const parsedMsg = message.content.split(' ')

    console.log(parsedMsg)

    if (parsedMsg[0] === '/prog') {
      console.log(`setting program to ${parsedMsg[1]}`)
      atem.setProgram(parsedMsg[1] + 1)
    } else if (parsedMsg[0] === '/prev') {
      console.log(`setting preview to ${parsedMsg[1]}`)
      atem.setPreview(parsedMsg[1] + 1)
    } else {
      socket.broadcast.emit('chat message', message)
      chatMessages.push(message)
    }
  })
})

atem.on('previewBus', id => {
  tallyState.preview = id - 1
  emitUpdate()
})
atem.on('programBus', id => {
  tallyState.program = id - 1
  emitUpdate()
})

http.listen(80, () => {
  console.log('listening on *:80')
})
