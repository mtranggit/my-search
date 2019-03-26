export const FETCH_STAR_WARS_REQUEST = 'FETCH_STAR_WARS_REQUEST'
export const FETCH_STAR_WARS_SUCCESS = 'FETCH_STAR_WARS_SUCCESS'
export const CONFIRM_STAR_WARS_FETCH_REQUEST = 'CONFIRM_STAR_WARS_FETCH_REQUEST'

export function fetchStarwarsRequest() {
  return {
    type: FETCH_STAR_WARS_REQUEST,
  }
}

export function fetchStarwarsSuccess(people) {
  return {
    type: FETCH_STAR_WARS_SUCCESS,
    payload: people,
  }
}

export function confirmStarwarsFetchRequest() {
  return {
    type: CONFIRM_STAR_WARS_FETCH_REQUEST,
  }
}
