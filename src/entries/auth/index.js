import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'

useStrict(true)

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <div>hello auth!!</div>,
  document.getElementById('root')
)