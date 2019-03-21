export const FETCH_BEERS_FULFILLED = 'FETCH_BEERS_FULFILLED'

export function fetchBeersFulfilled(beers) {
  return {
    type: FETCH_BEERS_FULFILLED,
    payload: beers,
  }
}
