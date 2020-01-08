import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { groups as groupsState} from '../selectors'
import { group as groupState } from '../selectors'
import { useAuth0 } from '../react-auth0-spa'
import {
  getGroups,
  getGroupById,
  resetGroup,
  addGroup,
  deleteGroup
} from '../actions'

export const useGroups = () => {
  const { getTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const { groups, loading, saving } = useSelector(groupsState)

  useEffect(() => {
    const fetchGroups = async () => {
      const token = await getTokenSilently()
      dispatch(getGroups(token))
    }
    fetchGroups()
  }, [])
  
  return {
    groups,
    loading,
    saving,
    addGroup: async (group) => {
      const token = await getTokenSilently()
      dispatch(addGroup(token, group))
    },
    deleteGroup: async (id) => {
      const token = await getTokenSilently()
      dispatch(deleteGroup(token, id)) 
    }
  }
}

export const useGroup = (id) => {
  const { getTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const { group, loading, error } = useSelector(groupState)

  useEffect(() => {
    const getGroup = async () => {
      if (id) {
        const token = await getTokenSilently()
        dispatch(getGroupById(token, id))
      }
    }
    getGroup()

    return () => {
      dispatch(resetGroup())
    }
  }, [id])

  return {
    group,
    loading,
    error
  }
}

