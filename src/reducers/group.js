import * as actions from '../actions'

export const initialState = {
  group: null,
  error: false,
  loading: false
}

const group = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.GET_GROUP_REQUEST:
      return { ...state, error: false, loading: true }
    case actions.GET_GROUP_SUCCESS:
      return { ...state, error: false, loading: false, group: payload }
    case actions.GET_GROUP_FAILURE:
      return { ...state, error: true, loading: false, group: null }
    case actions.RESET_GROUP:
      return { ...initialState }
    case actions.CONTACT_GROUPS_UPDATED:
      const { groups, contact } = payload
      if (state.group) {
        if (groups.includes(state.group.id)) {
          return {
            ...state,
            group: {
              ...state.group,
              contacts: [
                contact,
                ...state.group.contacts
              ]
            }
          }
        }

        const { contacts } = state.group
        return {
          ...state,
          group: {
            ...state.group,
            contacts: contacts.filter(x => x.id !== contact.id)
          }
        }
      }
      return { ...state }
    default:
      return { ...state }
  }
}

export default group
