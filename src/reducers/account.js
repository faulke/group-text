import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE
} from '../actions'

export const initialState = {
  account: null,
  loading: false
}

const account = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ACCOUNT_REQUEST:
      return { ...state, loading: true }
    case GET_ACCOUNT_SUCCESS:
      return { ...state, loading: false, account: payload }
    case GET_ACCOUNT_FAILURE:
      return { ...state, loading: false, account: null }
    default:
      return { ...state, loading: false }
  }
}

export default account
