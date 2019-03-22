import {FETCH_FULFILLED, SET_STATUS} from './beersAction'

const initialState = {
  data: [],
  // loading: true,
  status: 'idle', // 'idle' | 'pending' | 'success' | 'failure'
}

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload,
      }
    }
    case FETCH_FULFILLED: {
      return {
        ...state,
        // loading: false,
        status: 'success',
        data: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
