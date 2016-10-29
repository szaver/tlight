const names = {
  1: 'Computer',
  2: 'Camera 1',
  3: 'Camera 2',
  4: 'Camera 3',
  5: 'Camera 4',
  6: 'Leo-Marc',
  7: 'Camera 6',
  8: 'Camera 7',
  9: 'Camera 8',
  10: 'Camera 9',
}

var id = Number(prompt('enter your camera number')) + 1

var socket = io()

socket.on('update', function(state) {

  // log to console
  console.log(state, id)

  // update indicator bar
  if (state.program == id) {
    document.body.classList.add('program')
    document.body.classList.remove('preview')
  }
  else if (state.preview == id)
    document.body.classList.add('preview')

  if (state.program != id)
    document.body.classList.remove('program')
  else if (state.preview != id)
    document.body.classList.remove('preview')

  // update status text
  const programName = names[state.program]
  const previewName = names[state.preview]
  document.querySelector('.status').innerHTML = `Program: ${programName}<br/>Preview: ${previewName}`

})
