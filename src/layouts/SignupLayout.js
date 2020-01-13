import React from 'react'
import { Box } from 'grommet'
import Signup from '../views/Signup'
import NavBar from '../components/NavBar'

const SignupLayout = () => {
  return (
    <Box fill>
      <NavBar showAccount={false} />
      <Box flex pad="small" overflow="auto">
        <Signup />
      </Box>
    </Box>
  )
}

export default SignupLayout
