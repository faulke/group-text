import { RSAA, getJSON } from 'redux-api-middleware'

const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export const SUCCESS_TYPE = 'success'
export const ERROR_TYPE = 'error'

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const removeNotification = () => ({
  type: REMOVE_NOTIFICATION
})

export const addNotification = (type, message) => dispatch => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      type,
      message
    }
  })
  setTimeout(() => {
    dispatch(removeNotification())
  }, 3000)
}

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

export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST'
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS'
export const GET_GROUP_FAILURE = 'GET_GROUP_FAILURE'

export const getGroupById = (id) => ({
  [RSAA]: {
    endpoint: `/v1/groups/${id}`,
    method: 'GET',
    headers,
    types: [
      GET_GROUP_REQUEST,
      GET_GROUP_SUCCESS,
      GET_GROUP_FAILURE
    ]
  }
})

export const ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST'
export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS'
export const ADD_GROUP_FAILURE = 'ADD_GROUP_FAILURE'

export const addGroup = ({ name, description }) => dispatch => {
  return dispatch({
    [RSAA]: {
      endpoint: `/v1/groups`,
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        description
      }),
      types: [
        ADD_GROUP_REQUEST,
        {
          type: ADD_GROUP_SUCCESS,
          payload: async (action, state, res) => {
            const group = await getJSON(res)
            dispatch(addNotification(SUCCESS_TYPE, 'Group added successfully.'))
            return group
          }
        },
        {
          type: ADD_GROUP_FAILURE,
          payload: () => {
            dispatch(addNotification(ERROR_TYPE, 'Error adding group.'))
          }
        }
      ]
    }
  })
}



