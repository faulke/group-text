import { isRSAA, RSAA, getJSON } from 'redux-api-middleware'
import { getTokenSilently } from '../react-auth0-spa'
import history from "../utils/history"
import { SUBSCRIPTION_ERROR } from '../data/constants'

// add auth meta handlers to rsaa actions
// handle failure payload
// allow custom meta/payload handlers for success/failure
const copyActionTypes = (copiedTypes) => {
  const successMeta = (act, state, res) => {

  };

  const failureMeta = async (act, state, res) => {
    if (res.status === 401) {

    }

    if (res.status === 500) {

    }

    if (res.status === 404) {

    }
  };

  const failurePayload = async (act, state, res) => {
    const body = await getJSON(res)
    if (res.status === 401) {
      if (body.error && body.error === SUBSCRIPTION_ERROR) {
        history.push('/subscribe')
      }
    }
    return body
  }

  const request = copiedTypes[0];
  const success = {
    type: copiedTypes[1].type || copiedTypes[1],
    meta: successMeta,
  };

  if (copiedTypes[1].payload) {
    success.payload = copiedTypes[1].payload;
  }

  const failure = {
    type: copiedTypes[2].type || copiedTypes[2],
    meta: copiedTypes[2].meta || failureMeta,
    payload: copiedTypes[2].payload || failurePayload // allow to be overwritten
  };

  return [request, success, failure];
};

export default store => next => async action => {
  // check if it's a thunk
  const actionTest = typeof action === 'function' ? action() : action;

  if (isRSAA(actionTest)) {
    const actionCopy = { ...actionTest[RSAA] };
    let headers;

    if (actionCopy.headers) {
      headers = actionCopy.headers();
    }

    const token = await getTokenSilently()

    actionCopy.headers = () => {
      if (token) {
        return {
          ...headers,
          Authorization: `Bearer ${token}`
        };
      }
      return { ...headers };
    };

    // if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_API) {
    //   actionCopy.endpoint = process.env.REACT_APP_API + actionCopy.endpoint;
    // }

    actionCopy.types = copyActionTypes(actionCopy.types);

    return next({ [RSAA]: actionCopy });
  }

  return next(action);
};