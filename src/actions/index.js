import { RSAA, getJSON } from 'redux-api-middleware'
import history from "../utils/history"
import { SUBSCRIPTION_ERROR } from '../data/constants'

const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export const SUBSCRIPTION_STATUS_REQUEST = 'SUBSCRIPTION_STATUS_REQUEST'
export const SUBSCRIPTION_STATUS_SUCCESS = 'SUBSCRIPTION_STATUS_SUCCESS'
export const SUBSCRIPTION_STATUS_FAILURE = 'SUBSCRIPTION_STATUS_FAILURE'

export const checkSubscriptionStatus = () => ({
  [RSAA]: {
    endpoint: '/v1/account',
    method: 'GET',
    headers,
    types: [
      SUBSCRIPTION_STATUS_REQUEST,
      SUBSCRIPTION_STATUS_SUCCESS,
      {
        type: SUBSCRIPTION_STATUS_FAILURE,
        payload: async (act, state, res) => {
          const body = await getJSON(res)
          if (body.error && body.error === SUBSCRIPTION_ERROR) {
            history.push('/subscribe')
          }
          return body
        }
      }
    ]
  }
})
