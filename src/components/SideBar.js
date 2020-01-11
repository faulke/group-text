import React from 'react'
import PropTypes from 'prop-types'
import {
  Box
} from 'grommet'
import {
  CircleQuestion,
  Home,
  SettingsOption,
  Group,
  Tree,
  Schedules,
  ContactInfo
} from 'grommet-icons'
import MenuButton from './MenuButton'
import UserMenu from './UserMenu'

const SideBar = ({ user }) => {
  const items = [
    {
      label: 'Home',
      Icon: Home,
      path: '/',
      exact: true
    },
    {
      label: 'Groups',
      Icon: Group,
      path: '/groups'
    },
    {
      label: 'Contacts',
      Icon: ContactInfo,
      path: '/contacts'
    },
    {
      label: 'Phone Trees',
      Icon: Tree,
      path: '/trees'
    },
    {
      label: 'Scheduled',
      Icon: Schedules,
      path: '/scheduled'
    },
    {
      label: 'Account',
      Icon: SettingsOption,
      path: '/account'
    }
  ]

  return (
    <Box
      fill="vertical"
      width="75px"
      background="dark-2"
      elevation="medium"
    >
      <Box flex overflow="auto">
        {
          items.map(({ active, Icon, label, path, exact }) => (
            <MenuButton
              active={active}
              Icon={Icon}
              path={path}
              label={label}
              key={label}
              exact={exact}
            />
          ))
        }
      </Box>
      <MenuButton
        active={false}
        Icon={CircleQuestion}
        label="Help"
        path="/help"
      />
      {
        user && (
          <UserMenu user={user} />
        )
      }
    </Box>
  )
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired
}

export default SideBar
