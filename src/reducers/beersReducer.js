import {
  RESET,
  CANCEL,
  FETCH_FULFILLED,
  FETCH_FAILED,
  SET_STATUS,
} from './beersAction'

const initialState = {
  data: [],
  // loading: true,
  status: 'idle', // 'idle' | 'pending' | 'success' | 'failure'
  messages: [],
}

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload,
      }
    }
    case CANCEL:
    case RESET: {
      return {
        ...state,
        status: 'idle',
        messages: [],
      }
    }
    case FETCH_FULFILLED: {
      return {
        ...state,
        // loading: false,
        status: 'success',
        data: action.payload,
        messages: [],
      }
    }
    case FETCH_FAILED: {
      return {
        ...state,
        // loading: false,
        status: 'failure',
        messages: [{type: 'error', text: action.payload}],
      }
    }
    default: {
      return state
    }
  }
}
