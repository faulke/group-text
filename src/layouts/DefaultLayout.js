import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../views/Home'
import Profile from '../views/Profile'

const DefaultLayout = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/account" exact component={Profile} />
      </Switch>
    </div>
  )
}

export default DefaultLayout
