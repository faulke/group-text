import React, { useEffect } from 'react'
import { useAuth0 } from '../react-auth0-spa'
import {
  Button
} from 'grommet'

const Login = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const logoutWithRedirect = () => {
    logout({
      returnTo: `${window.location.origin}/login`
    })
  }

  useEffect(() => {
    const fn = () => {
      if (isAuthenticated) {
        logoutWithRedirect()
      }
    }
    fn()
  }, [isAuthenticated])

  return (
    <div>
      <Button
        primary
        label="Log In"
        onClick={() => loginWithRedirect({})}
      />
    </div>
  )
}

export default Login
