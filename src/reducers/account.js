import * as actions from '../actions'

export const initialState = {
  active: null,
  loading: false
}

const account = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.SUBSCRIPTION_STATUS_REQUEST:
      return { ...state, loading: true}
    case actions.SUBSCRIPTION_STATUS_SUCCESS:
      return { ...state, loading: false, active: payload }
    case actions.SUBSCRIPTION_STATUS_FAILURE:
      return { ...state, loading: false, active: false }
    default:
      return { ...state, loading: false }
  }
}

export default account
