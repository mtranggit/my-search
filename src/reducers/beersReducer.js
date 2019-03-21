import {FETCH_BEERS_FULFILLED} from './beersAction'

const initialState = {
  data: [],
  loading: true,
}

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEERS_FULFILLED: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
