import React from 'react'
import PropTypes from 'prop-types'
import { matchPath, useHistory } from 'react-router-dom'
import {
  Box,
  Text
} from 'grommet'
import RoutedButton from './RoutedButton'

const MenuButton = ({ active, Icon, label, path, ...rest }) => {
  const router = useHistory()

  return (
    <RoutedButton
      active={active || !!matchPath(router.location.pathname, { path, exact: true })}
      hoverIndicator="dark-4"
      path={path}
      {...rest}
    >
      <Box
        pad={{ vertical: 'small' }}
        gap="xsmall"
        align="center"
        justify="center"
      >
        <Icon color="light-5" />
        <Text size="xsmall" color="white">
          { label }
        </Text>
      </Box>
    </RoutedButton>
  )
}

export default MenuButton
