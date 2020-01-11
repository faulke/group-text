import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Box,
  Layer,
  Text,
  Button
} from 'grommet'
import {
  Close
} from 'grommet-icons'
import { useSelector, useDispatch } from 'react-redux'
import { notification as notificationState } from '../selectors'
import { removeNotification, SUCCESS_TYPE, ERROR_TYPE } from '../actions'
import NavBar from '../components/NavBar'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Messages from '../views/Messages'
import Loading from '../components/Loading'
import SideBar from '../components/SideBar'
import Groups from '../views/Groups'
import Group from '../views/Group'
import Contacts from '../views/Contacts'
import Beta from '../views/Beta'

const DefaultLayout = ({ account = {}, user = {}, loading }) => {
  const { notification } = useSelector(notificationState)
  const dispatch = useDispatch()
  const closeNotification = () => dispatch(removeNotification())
  const getBackground = (type) => {
    switch (type) {
      case SUCCESS_TYPE:
        return 'status-ok'
      case ERROR_TYPE:
        return 'status-error'
      default:
        return 'status-unknown'
    }
  }

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
                <Route path="/groups/:id" component={Group} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/beta" component={Beta} />
              </Switch>
            </Box>
          </Box>
        )
      }
      {
        notification && (
          <Layer
            position="top"
            modal={false}
            responsive={false}
          >
            <Box
              direction="row"
              background={getBackground(notification.type)}
              align="center"
              justify="center"
              pad="small"
            >
              <Text>{notification.message}</Text>
              <Button
                plain
                icon={<Close size="small" />}
                margin={{ horizontal: 'small' }}
                onClick={closeNotification}
              />
            </Box>
          </Layer>
        )
      }
    </Box>
  )
}

DefaultLayout.propTypes = {
  account: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool
}

DefaultLayout.defaultProps = {
  account: {},
  user: {},
  loading: false
}

export default DefaultLayout
