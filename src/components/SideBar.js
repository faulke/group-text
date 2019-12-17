import React from 'react'
import PropTypes from 'prop-types'
import { matchPath, useHistory } from 'react-router-dom'
import {
  Box,
  Text
} from 'grommet'
import {
  Chat,
  Home,
  SettingsOption
} from 'grommet-icons'
import MenuButton from './MenuButton'
import UserMenu from './UserMenu'

const SideBar = ({ user }) => {
  const items = [
    {
      label: 'Home',
      Icon: Home,
      path: '/'
    },
    {
      label: 'Messages',
      Icon: Chat,
      path: '/messages'
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
          items.map(({ active, Icon, label, path }) => (
            <MenuButton
              active={active}
              Icon={Icon}
              path={path}
              label={label}
              key={label}
            />
          ))
        }
      </Box>
      {
        user && (
          <UserMenu user={user} />
        )
      }
    </Box>
  )
}

export default SideBar
