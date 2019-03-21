export function appReducer(state = {name: 'Michael'}, action) {
  switch (action.type) {
    case 'SET_NAME': {
      return {
        ...state,
        name: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
