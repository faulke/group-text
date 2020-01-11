import * as actions from '../actions'

export const initialState = {
  contacts: [],
  loading: false,
  saving: false,
  error: false
}

const contacts = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.GET_CONTACTS_REQUEST:
      return { ...state, error: false, loading: true }
    case actions.GET_CONTACTS_SUCCESS:
      return { ...state, error: false, loading: false, contacts: payload }
    case actions.GET_CONTACTS_FAILURE:
      return { ...state, error: true, loading: false, contacts: [] }
    case actions.ADD_CONTACT_REQUEST:
      return { ...state, saving: true }
    case actions.ADD_CONTACT_SUCCESS:
      return { ...state, saving: false, contacts: [payload, ...state.contacts] }
    case actions.ADD_CONTACT_FAILURE:
      return { ...state, saving: false }
    default:
      return { ...state }
  }
}

export default contacts
