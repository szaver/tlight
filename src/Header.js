const { div, createComponent } = require('preact-hyperscript')

const names = {
  0: '?',
  1: 'Computer',
  2: 'Camera 1',
  3: 'Camera 2',
  4: 'Camera 3',
  5: 'Camera 4',
  6: 'Leo-Marc',
  7: 'Camera 6',
  8: 'Camera 7',
  9: 'Camera 8',
  10: 'Camera 9'
}

const Header = ({ cameraState, cameraId }) => {
  const divClasses = {
    header: true,
    preview: cameraState.preview === cameraId,
    program: cameraState.program === cameraId
  }

  return div({class: divClasses}, [
    div('.left', `Preview: ${names[cameraState.preview]}`),
    div('.left', `Program: ${names[cameraState.program]}`)
  ])
}

module.exports = createComponent(Header)
