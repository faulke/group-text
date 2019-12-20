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
import Groups from '../views/Groups'

const DefaultLayout = ({ account, loading, user }) => {
  if (loading) {
    return (
      <div>
        <NavBar />
        <Loading />
      </div>
    )
  }

  return (
    <Box fill>
      <NavBar />
      {
        account && (
          <Box direction="row" fill>
            <SideBar user={user} />
            <Box flex pad="small" overflow="auto">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/account" exact component={Profile} />
                <Route path="/messages" exact component={Messages} />
                <Route path="/groups" exact component={Groups} />
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
