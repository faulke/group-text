import deepFreeze from 'deep-freeze'
import account, { initialState } from './account'
import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE
} from '../actions'

describe('account reducer', () => {
  it('should provide the initial state', () => {
    expect(account(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_ACCOUNT_REQUEST action', () => {
    const stateBefore = { ...initialState }
    const stateAfter = { ...initialState, loading: true }
    const action = { type: GET_ACCOUNT_REQUEST }

    deepFreeze(stateBefore)
    deepFreeze(stateAfter)
    deepFreeze(action)

    expect(account(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle GET_ACCOUNT_SUCCESS action', () => {
    const stateBefore = { ...initialState, loading: true }
    const payload = {
      account: {
        id: 1,
        name: 'Test',
        email: 'test@email.com',
        sub: {
          status_id: 1
        }
      }
    }
    const stateAfter = { ...initialState, loading: false, account: payload }
    const action = { type: GET_ACCOUNT_SUCCESS, payload }

    deepFreeze(stateBefore)
    deepFreeze(stateAfter)
    deepFreeze(action)

    expect(account(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle GET_ACCOUNT_FAILURE action', () => {
    const stateBefore = { ...initialState, loading: true, account: 'test' }
    const stateAfter = { ...initialState, loading: false, account: null }
    const action = { type: GET_ACCOUNT_FAILURE }

    deepFreeze(stateBefore)
    deepFreeze(stateAfter)
    deepFreeze(action)

    expect(account(stateBefore, action)).toEqual(stateAfter)
  })
})
