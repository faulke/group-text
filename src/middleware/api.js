import { isRSAA, RSAA, getJSON } from 'redux-api-middleware'
import history from '../utils/history'
import { SUBSCRIPTION_ERROR, ACCOUNT_ERROR } from '../data/constants'

// add auth meta handlers to rsaa actions
// handle failure payload
// allow custom meta/payload handlers for success/failure
const copyActionTypes = (copiedTypes) => {
  const successMeta = (act, state, res) => {

  }

  const failureMeta = async (act, state, res) => {

  }

  const failurePayload = async (act, state, res) => {
    const body = await getJSON(res)
    if (res.status === 401 && body.error) {
      if (body.error === ACCOUNT_ERROR) {
        history.push('/signup')
      } else if (body.error === SUBSCRIPTION_ERROR) {
        history.push('/subscribe')
      }
    }
    return body
  }

  const request = copiedTypes[0]
  const success = {
    type: copiedTypes[1].type || copiedTypes[1],
    meta: successMeta,
  }

  if (copiedTypes[1].payload) {
    success.payload = copiedTypes[1].payload
  }

  const failure = {
    type: copiedTypes[2].type || copiedTypes[2],
    meta: copiedTypes[2].meta || failureMeta,
    payload: copiedTypes[2].payload || failurePayload // allow to be overwritten
  }

  return [request, success, failure]
}

export default store => next => async action => {
  // check if it's a thunk
  const actionTest = typeof action === 'function' ? action() : action

  if (isRSAA(actionTest)) {
    const actionCopy = { ...actionTest[RSAA] }

    if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_API_HOST) {
      actionCopy.endpoint = process.env.REACT_APP_API_HOST + actionCopy.endpoint
    }

    actionCopy.types = copyActionTypes(actionCopy.types)

    return next({ [RSAA]: actionCopy })
  }

  return next(action)
}
