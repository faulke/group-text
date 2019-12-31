import * as actions from '../actions'

export const initialState = {
  notification: null
}

const notification = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.ADD_NOTIFICATION:
      return { ...state, notification: payload }
    case actions.REMOVE_NOTIFICATION:
      return { ...state, notification: null }
    default:
      return { ...state }
  }
}

export default notification
