import React from 'react'
import { NavLink as RouterNavLink, useHistory } from 'react-router-dom'
import {
  Button,
  Box,
  Grid,
  Heading,
  Image,
  Menu
} from 'grommet'
import { Ad } from 'grommet-icons'
import PropTypes from 'prop-types'
import { useAuth0 } from '../react-auth0-spa'

const NavBar = ({ showAccount = true }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const history = useHistory()

  const logoutWithRedirect = () => {
    logout({ returnTo: `${window.location.origin}/login` })
  }

  return (
    <div className="nav-container">
      <Box
        height="xsmall"
        background="light-2"
        elevation="xsmall"
        justify="center"
        pad="small"
      >
        <Grid columns={['small', 'flex', 'small']}>
          <RouterNavLink to="/">
            <Box
              align="center"
              direction="row"
              pad="small"
              gap="small"
              fill="vertical"
              justify="center"
            >
              <Ad size="large" />
              <Heading level="4">Notify Hub</Heading>
            </Box>
          </RouterNavLink>
          <Box />
          <Box
            align="center"
            justify="center"
            pad="small"
          >
            {!isAuthenticated && (
              <Button
                primary
                label="Log In"
                onClick={() => loginWithRedirect({})}
              />
            )}
            {isAuthenticated && (
              <Menu
                dropAlign={{ top: 'bottom', right: 'right' }}
                label={(
                  <Box
                    height="xxsmall"
                    width="xxsmall"
                  >
                    <Image
                      src={user.picture}
                      fit="cover"
                    />
                  </Box>
                )}
                items={showAccount ? [
                  {
                    label: 'Account',
                    onClick: () => history.push('/account')
                  },
                  {
                    label: 'Log Out',
                    onClick: () => logoutWithRedirect()
                  }
                ] : [
                  {
                    label: 'Log Out',
                    onClick: () => logoutWithRedirect()
                  }
                ]}
              />
            )}
          </Box>
        </Grid>
      </Box>
    </div>
  )
}

NavBar.propTypes = {
  showAccount: PropTypes.bool
}

NavBar.defaultProps = {
  showAccount: true
}

export default NavBar
