import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../views/Login'

const LoginLayout = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
    </Switch>
  )
}

export default LoginLayout
