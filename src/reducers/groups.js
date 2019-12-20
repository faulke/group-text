import * as actions from '../actions'

export const initialState = {
  groups: null,
  loading: false,
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
    default:
      return { ...initialState }
  }
}

export default groups
