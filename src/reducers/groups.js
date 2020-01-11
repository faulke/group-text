import * as actions from '../actions'

export const initialState = {
  groups: [],
  loading: false,
  saving: false,
  error: false
}

const groups = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.GET_GROUPS_REQUEST:
      return { ...state, error: false, loading: true }
    case actions.GET_GROUPS_SUCCESS:
      return { ...state, error: false, loading: false, groups: payload }
    case actions.GET_GROUPS_FAILURE:
      return { ...state, loading: false, error: true, groups: [] }
    case actions.ADD_GROUP_REQUEST:
      return { ...state, saving: true }
    case actions.ADD_GROUP_SUCCESS:
      return { ...state, saving: false, groups: [payload, ...state.groups] }
    case actions.DELETE_GROUP_REQUEST:
      return { ...state, saving: true }
    case actions.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        saving: false,
        groups: state.groups.filter(x => x.id !== payload.id)
      }
    case actions.ADD_GROUP_FAILURE:
    case actions.DELETE_GROUP_FAILURE:
      return { ...state, saving: false }
    default:
      return { ...state }
  }
}

export default groups
