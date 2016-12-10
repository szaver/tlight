const { render } = require('preact')
const { createElement } = require('preact-hyperscript')

const App = require('./App')

const container = document.querySelector('.container')

render(createElement(App), container)
