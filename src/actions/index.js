import { RSAA, getJSON } from 'redux-api-middleware'
import history from '../utils/history'
import { getTokenSilently } from '../react-auth0-spa'

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

export const addNotification = (type, message) => (dispatch) => {
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

export const addGroup = (token, { name, description }) => (dispatch) => {
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

export const deleteGroup = (token, id) => (dispatch) => {
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
          payload: () => {
            dispatch(addNotification(ERROR_TYPE, 'Error deleting group.'))
          }
        }
      ]
    }
  })
}

export const CONTACT_GROUPS_UPDATED = 'CONTACT_GROUPS_UPDATED'

export const contactGroupsUpdated = (groups, contact) => ({
  type: CONTACT_GROUPS_UPDATED,
  payload: { groups, contact }
})

export const UPDATE_CONTACT_GROUPS_REQUEST = 'UPDATE_CONTACT_GROUPS_REQUEST'
export const UPDATE_CONTACT_GROUPS_SUCCESS = 'UPDATE_CONTACT_GROUPS_SUCCESS'
export const UPDATE_CONTACT_GROUPS_FAILURE = 'UPDATE_CONTACT_GROUPS_FAILURE'

export const updateContactGroups = (token, contact, groups = [], notify) => (dispatch) => {
  return dispatch({
    [RSAA]: {
      endpoint: `/v1/contacts/${contact.id}/groups`,
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify({
        group_ids: groups
      }),
      types: [
        UPDATE_CONTACT_GROUPS_REQUEST,
        {
          type: UPDATE_CONTACT_GROUPS_SUCCESS,
          payload: async (action, state, res) => {
            const newGroups = await getJSON(res)
            const message = notify || 'Contact groups updated.'

            dispatch(contactGroupsUpdated(groups, contact))
            dispatch(addNotification(SUCCESS_TYPE, message))

            return newGroups
          }
        },
        {
          type: UPDATE_CONTACT_GROUPS_FAILURE,
          payload: () => {
            dispatch(addNotification(ERROR_TYPE, 'Error updating contact groups.'))
          }
        }
      ]
    }
  })
}

export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST'
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS'
export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE'

export const addContact = (token, { name, phone_number, groups }) => (dispatch) => {
  const formatted = `+1${phone_number.replace(/\D/g, '')}`
  const groupIds = groups.map(x => x.value)

  return dispatch({
    [RSAA]: {
      endpoint: '/v1/contacts',
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({
        name,
        number: {
          phone_number: formatted,
          friendly_name: phone_number
        }
      }),
      types: [
        ADD_CONTACT_REQUEST,
        {
          type: ADD_CONTACT_SUCCESS,
          payload: async (action, state, res) => {
            const contact = await getJSON(res)

            if (groupIds.length) {
              dispatch(updateContactGroups(token, contact, groupIds, 'Contact added.'))
              // optimistic ui before contact groups applied
              contact.numGroups = groupIds.length
            }

            return contact
          }
        },
        {
          type: ADD_CONTACT_FAILURE,
          payload: () => {
            dispatch(addNotification(ERROR_TYPE, 'Error adding contact.'))
          }
        }
      ]
    }
  })
}

export const GET_CONTACTS_REQUEST = 'GET_CONTACTS_REQUEST'
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS'
export const GET_CONTACTS_FAILURE = 'GET_CONTACTS_FAILURE'

export const getContacts = (token) => ({
  [RSAA]: {
    endpoint: '/v1/contacts',
    method: 'GET',
    headers: headers(token),
    types: [
      GET_CONTACTS_REQUEST,
      GET_CONTACTS_SUCCESS,
      GET_CONTACTS_FAILURE
    ]
  }
})

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signUp = (token, name, number) => (dispatch) => {
  return dispatch({
    [RSAA]: {
      endpoint: '/v1/account',
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({
        name,
        zip_code: number
      }),
      types: [
        SIGNUP_REQUEST,
        {
          type: SIGNUP_SUCCESS,
          payload: async () => {
            await getTokenSilently()
            history.replace('/subscribe')
          }
        },
        {
          type: SIGNUP_FAILURE,
          payload: () => {
            dispatch(addNotification(ERROR_TYPE, 'Error during sign up.'))
          }
        }
      ]
    }
  })
}
