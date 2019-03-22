import {ajax} from 'rxjs/ajax'
import {map, switchMap, tap, ignoreElements} from 'rxjs/operators'
import {
  SEARCH,
  fetchFulfilled,
  setStatus,
  FETCH_DATA,
} from '../reducers/beersAction'
import {ofType} from 'redux-observable'
import {concat, of} from 'rxjs'

const API = 'https://api.punkapi.com/v2/beers'
const searchQuery = term => `${API}?beer_name=${encodeURIComponent(term)}`

export function fetchBeersEpic(action$) {
  return action$.pipe(
    ofType(SEARCH),
    switchMap(({payload}) => {
      return concat(
        of(setStatus('pending')),
        ajax.getJSON(searchQuery(payload)).pipe(map(fetchFulfilled)),
      )
    }),
    // ofType(FETCH_DATA),
    // switchMap(() => {
    //   return concat(
    //     of(setStatus('pending')),
    //     ajax.getJSON(API).pipe(map(fetchFulfilled)),
    //   )
    // }),
  )
  // return ajax.getJSON(API).pipe(
  //   map(fetchBeersFulfilled),
  //   // tap(console.log),
  //   // ignoreElements(),
  // )
}
