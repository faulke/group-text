import * as actions from '../actions'

export const initialState = {
  account: null,
  loading: false
}

const account = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.GET_ACCOUNT_REQUEST:
      return { ...state, loading: true }
    case actions.GET_ACCOUNT_SUCCESS:
      return { ...state, loading: false, account: payload }
    case actions.GET_ACCOUNT_FAILURE:
      return { ...state, loading: false, account: null }
    default:
      return { ...state, loading: false }
  }
}

export default account
