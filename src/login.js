import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { HashRouter as Router } from 'react-router-dom'
import Bundle from './components/Common/Bundle'

import lazyLogin from 'bundle-loader?lazy!./components/Layout/Login'

const Login = () => (
    <Bundle load={lazyLogin}>
      {(Login) => <Login />}
    </Bundle>
  )

import appStore from './stores/appStore'

const stores = { appStore }

if (module.hot) {
    console.log('sccept');
    module.hot.accept();
}

ReactDOM.render(
    <Provider {...stores}>
        <Router basename="/">
            <Login />
        </Router>
    </Provider>,
    document.getElementById('root')
)