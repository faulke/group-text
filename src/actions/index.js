import { RSAA } from 'redux-api-middleware'

const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export const GET_ACCOUNT_REQUEST = 'GET_ACCOUNT_REQUEST'
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS'
export const GET_ACCOUNT_FAILURE = 'GET_ACCOUNT_FAILURE'

export const getAccount = () => ({
  [RSAA]: {
    endpoint: '/v1/account',
    method: 'GET',
    headers,
    types: [
      GET_ACCOUNT_REQUEST,
      GET_ACCOUNT_SUCCESS,
      GET_ACCOUNT_FAILURE
    ]
  }
})
