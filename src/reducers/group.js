import * as actions from '../actions'

export const initialState = {
  group: null,
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
    default:
      return { ...state }
  }
}

export default group
