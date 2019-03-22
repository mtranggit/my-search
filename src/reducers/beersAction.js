export const FETCH_FULFILLED = 'FETCH_BEERS_FULFILLED'
export const SET_STATUS = 'SET_STATUS'
export const FETCH_DATA = 'FETCH_DATA'
export const SEARCH = 'SEARCH'
export const FETCH_FAILED = 'FETCH_FAILED'

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

export function fetchFailed(message) {
  return {
    type: FETCH_FAILED,
    payload: message,
  }
}
