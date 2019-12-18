import * as actions from '../actions'

export const initialState = {
  plans: [],
  loading: false,
  error: false
}

const plans = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.GET_PLANS_REQUEST:
      return { ...state, error: false, loading: true }
    case actions.GET_PLANS_SUCCESS:
      return { ...state, error: false, loading: false, plans: payload }
    case actions.GET_ACCOUNT_FAILURE:
      return { ...state, loading: false, plans: [], error: true }
    default:
      return { ...initialState }
  }
}

export default plans
