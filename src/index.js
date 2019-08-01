import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
// import { BrowserRouter as Router } from 'react-router-dom'
import { HashRouter as Router } from 'react-router-dom'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

import App from './components/App'

import appStore from './stores/appStore'
import propertyProfileStore from './stores/propertyProfileStore'
import hotelStore from './stores/hotelStore'
import deviceStore from './stores/deviceStore'
import skillStore from './stores/skillStore'
import intentStore from './stores/intentStore'
import roomTypeStore from './stores/roomTypeStore'
import roomStore from './stores/roomStore'
import contentStore from './stores/contentStore'
import contactStore from './stores/contactStore'

const stores = { appStore, propertyProfileStore, hotelStore, deviceStore, skillStore, intentStore, roomStore, roomTypeStore, contentStore, contactStore }

if (module.hot) {
  console.log('sccept');
  module.hot.accept();
}

ReactDOM.render(
  <Provider {...stores}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)