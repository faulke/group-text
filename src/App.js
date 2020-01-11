import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Loading from './components/Loading'
import LoginLayout from './layouts/LoginLayout'
import SubscribeLayout from './layouts/SubscribeLayout'
import DefaultLayout from './layouts/DefaultLayout'
import { useAuth0 } from './react-auth0-spa'
import history from './utils/history'

// styles
import './App.css'

const App = () => {
  const { loading } = useAuth0()

  if (loading) {
    return <Loading absolute />
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginLayout} />
        <PrivateRoute path="/subscribe" exact subscription={false} component={SubscribeLayout} />
        <PrivateRoute path="/" component={DefaultLayout} />
      </Switch>
    </Router>
  )
}

export default App
