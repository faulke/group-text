import { createStore, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import apiAuth from '../middleware/api'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, apiAuth, apiMiddleware)
    )
  )
}
