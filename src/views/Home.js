import React from 'react'
import {
  Box,
  Heading,
  Text
} from 'grommet'
import { useSelector } from 'react-redux'
import { account as accountState }  from '../selectors'

const Home = () => {
  const { account } = useSelector(accountState)

  return (
    <div className="page-container">
      {
        account && (
          <Box
            fill
            alignContent="center"
            justify="center"
            pad="large"
          >
            <Heading level={2}>Your phone number is:</Heading>
            <Text>{account.number.friendly_name}</Text>
          </Box>
        )
      }
    </div>
  )
}

export default Home
