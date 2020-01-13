import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import { account as accountState } from '../selectors'
import {
  getAccount,
  signUp
} from '../actions'

export const useAccount = (subscription = true) => {
  const { getTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const history = useHistory()
  const { account, loading } = useSelector(accountState)

  useEffect(() => {
    const fetchAccount = async () => {
      if (subscription) {
        if (account === null) {
          const token = await getTokenSilently()
          dispatch(getAccount(token))
        } else if (!account.sub || account.sub.status_id !== 1) {
          history.push('/subscribe')
        }
      }
    }
    fetchAccount()
  }, [account, subscription])

  return {
    account,
    loading
  }
}

export const useSignup = () => {
  const { getTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  return {
    signUp: async ({ name, number }) => {
      const token = await getTokenSilently()
      dispatch(signUp(token, name, number))
    }
  }
}
