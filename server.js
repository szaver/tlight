const express = require('express')
const app = express()
const http = require('http').Server(app)
const morgan = require('morgan')
const Atem = require('atem')
const path = require('path')
var io = require('socket.io')(http);

const atem = new Atem('192.168.10.240')

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

const tallyState = {
  program: 0,
  preview: 0
}

const emitUpdate = () => {
  console.log(`emitting update`, tallyState)
  io.emit('update', tallyState)
}

io.on('connection', (socket) => {
  console.log('a client connected')
  emitUpdate()
})

atem.on('previewBus', id => {
  tallyState.preview = id
  emitUpdate()
})
atem.on('programBus', id => {
  tallyState.program = id
  emitUpdate()
})

http.listen(80, function(){

  console.log('listening on *:3000');

  var os = require('os');
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });
})
