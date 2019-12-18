import React from 'react'
import { Box } from 'grommet'
import Subscribe from '../views/Subscribe'
import NavBar from '../components/NavBar'

const SubscribeLayout = () => {
  return (
    <Box fill>
      <NavBar />
      <Box flex pad="small" overflow="auto">
        <Subscribe />
      </Box>
    </Box>
  )
}

export default SubscribeLayout
