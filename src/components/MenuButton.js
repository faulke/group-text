import React from 'react'
import PropTypes from 'prop-types'
import { matchPath, useHistory } from 'react-router-dom'
import {
  Box,
  Text
} from 'grommet'
import RoutedButton from './RoutedButton'

const MenuButton = ({ active = false, Icon, label, path, exact = false, ...rest }) => {
  const router = useHistory()

  return (
    <RoutedButton
      active={active || !!matchPath(router.location.pathname, { path, exact })}
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

MenuButton.propTypes = {
  active: PropTypes.bool,
  Icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

export default MenuButton
