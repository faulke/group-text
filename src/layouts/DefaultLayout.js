import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import NavBar from '../components/NavBar'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Messages from '../views/Messages'
import Loading from '../components/Loading'
import SideBar from '../components/SideBar'

const DefaultLayout = ({ active, loading, user }) => {
  if (loading) {
    return (
      <div>
        <NavBar active={active} />
        <Loading />
      </div>
    )
  }

  return (
    <Box fill>
      <NavBar active={active} />
      {
        active && (
          <Box direction="row" fill>
            <SideBar user={user} />
            <Box flex className="scroll">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/account" exact component={Profile} />
                <Route path="/messages" exact component={Messages} />
              </Switch>
            </Box>
          </Box>
        )
      }
    </Box>
  )
}

DefaultLayout.propTypes = {
  active: PropTypes.bool,
  loading: PropTypes.bool
}

export default DefaultLayout
