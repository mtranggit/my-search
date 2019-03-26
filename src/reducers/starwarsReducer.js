import {FETCH_STAR_WARS_SUCCESS} from '../actions/starwarsAction'
const initialState = {
  people: [],
}

export function starwarsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STAR_WARS_SUCCESS: {
      return {
        ...state,
        people: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default starwarsReducer
