import { RSAA, getJSON } from 'redux-api-middleware'

const headers = (token) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
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

export const getAccount = (token) => ({
  [RSAA]: {
    endpoint: '/v1/account',
    method: 'GET',
    headers: headers(token),
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

export const getPlans = (token) => ({
  [RSAA]: {
    endpoint: '/v1/plans',
    method: 'GET',
    headers: headers(token),
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

export const getGroups = (token) => ({
  [RSAA]: {
    endpoint: '/v1/groups',
    method: 'GET',
    headers: headers(token),
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

export const getGroupById = (token, id) => ({
  [RSAA]: {
    endpoint: `/v1/groups/${id}`,
    method: 'GET',
    headers: headers(token),
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

export const addGroup = (token, { name, description }) => dispatch => {
  return dispatch({
    [RSAA]: {
      endpoint: '/v1/groups',
      method: 'POST',
      headers: headers(token),
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

export const RESET_GROUP = 'RESET_GROUP'
export const resetGroup = () => ({
  type: RESET_GROUP
})

export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST'
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS'
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE'

export const deleteGroup = (token, id) => dispatch => {
  return dispatch({
    [RSAA]: {
      endpoint: `/v1/groups/${id}`,
      method: 'DELETE',
      headers: headers(token),
      types: [
        DELETE_GROUP_REQUEST,
        {
          type: DELETE_GROUP_SUCCESS,
          payload: () => {
            dispatch(addNotification(SUCCESS_TYPE, 'Group deleted.'))
            return { id }
          }
        },
        {
          type: DELETE_GROUP_FAILURE,
          payload: ()  => {
            dispatch(addNotification(ERROR_TYPE, 'Error deleting group.'))
          }
        }
      ]
    }
  })
}
