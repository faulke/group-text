import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { groups as groupsState } from '../selectors'
import { getGroups } from '../actions'
import { Box } from 'grommet'
import Loading from '../components/Loading'

const Groups = () => {
  const dispatch = useDispatch()
  const { groups, loading } = useSelector(groupsState)

  useEffect(() => {
    if (!groups) {
      dispatch(getGroups)
    }
  }, [JSON.stringify(groups)])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <Box>
      {
        groups && groups.map((group) => (
          <div key={group.id}>{group.name}</div>
        ))
      }
    </Box>
  )
}

export default Groups
