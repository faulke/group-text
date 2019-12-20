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

export const GET_PLANS_REQUEST = 'GET_PLANS_REQUEST'
export const GET_PLANS_SUCCESS = 'GET_PLANS_SUCCESS'
export const GET_PLANS_FAILURE = 'GET_PLANS_FAILURE'

export const getPlans = () => ({
  [RSAA]: {
    endpoint: '/v1/plans',
    method: 'GET',
    headers,
    types: [
      GET_PLANS_REQUEST,
      GET_PLANS_SUCCESS,
      GET_PLANS_FAILURE
    ]
  }
})

export const GET_GROUPS_REQUEST = 'GET_GROUPS_REQUEST'
export const GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS'
export const GET_GROUPS_FAILURE = 'GET_GROUPS_FAILURE'

export const getGroups = () => ({
  [RSAA]: {
    endpoint: '/v1/groups',
    method: 'GET',
    headers,
    types: [
      GET_GROUPS_REQUEST,
      GET_GROUPS_SUCCESS,
      GET_GROUPS_FAILURE
    ]
  }
})
