import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Messages from '../views/Messages'
import Loading from '../components/Loading'

const DefaultLayout = ({ active, loading }) => {
  console.log(loading)
  if (loading) {
    return (
      <div>
        <NavBar active={active} />
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <NavBar active={active} />
      {
        active ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account" exact component={Profile} />
            <Route path="/messages" exact component={Messages} />
          </Switch>
        ) : null
      }
    </div>
  )
}

DefaultLayout.propTypes = {
  active: PropTypes.bool,
  loading: PropTypes.bool
}

export default DefaultLayout
