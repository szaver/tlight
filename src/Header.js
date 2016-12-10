const { div, createComponent } = require('preact-hyperscript')

const names = {
  0: 'Computer',
  1: 'Camera 1',
  2: 'Camera 2',
  3: 'Camera 3',
  4: 'Camera 4',
  5: 'Leo-Marc',
  6: 'Camera 6',
  7: 'Camera 7',
  8: 'Camera 8',
  9: 'Camera 9'
}

const Header = ({ cameraState, cameraId, full, toggleFull }) => {
  const divClasses = {
    header: true,
    full: full,
    preview: cameraState.preview === cameraId,
    program: cameraState.program === cameraId
  }

  return div({class: divClasses, onClick: toggleFull}, [
    div('.left', `Preview: ${names[cameraState.preview]}`),
    div('.left', `Program: ${names[cameraState.program]}`)
  ])
}

module.exports = createComponent(Header)
