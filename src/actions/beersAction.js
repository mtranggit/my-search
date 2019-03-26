export const FETCH_FULFILLED = 'FETCH_BEERS_FULFILLED'
export const SET_STATUS = 'SET_STATUS'
export const FETCH_DATA = 'FETCH_DATA'
export const SEARCH = 'SEARCH'
export const RANDOM = 'RANDOM'
export const CANCEL = 'CANCEL'
export const RESET = 'RESET'
export const FETCH_FAILED = 'FETCH_FAILED'

export const DEBOUNCE_INPUT_CHANGE = 'DEBOUNCE_INPUT_CHANGE'
export const THROTTLE_INPUT_CHANGE = 'THROTTLE_INPUT_CHANGE'

export function fetchFulfilled(beers) {
  return {
    type: FETCH_FULFILLED,
    payload: beers,
  }
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status,
  }
}

export function fetchData() {
  return {
    type: FETCH_DATA,
  }
}

export function search(input) {
  return {
    type: SEARCH,
    payload: input,
  }
}

export function cancel() {
  return {
    type: CANCEL,
  }
}

export function reset() {
  return {
    type: RESET,
  }
}

export function fetchFailed(message) {
  return {
    type: FETCH_FAILED,
    payload: message,
  }
}

export function random() {
  return {
    type: RANDOM,
  }
}

export function debounceInputChange(input) {
  return {
    type: DEBOUNCE_INPUT_CHANGE,
    payload: input,
  }
}

export function throttleInputChange(input) {
  return {
    type: THROTTLE_INPUT_CHANGE,
    payload: input,
  }
}
