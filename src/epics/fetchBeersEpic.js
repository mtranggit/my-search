import {ajax} from 'rxjs/ajax'
import {
  map,
  delay,
  switchMap,
  debounceTime,
  filter,
  catchError,
  takeUntil,
} from 'rxjs/operators'
// import {map, switchMap, tap, ignoreElements} from 'rxjs/operators'
import {
  SEARCH,
  fetchFulfilled,
  fetchFailed,
  setStatus,
  CANCEL,
  // FETCH_DATA,
} from '../reducers/beersAction'
import {ofType} from 'redux-observable'
import {concat, of} from 'rxjs'

const API = 'https://api.punkapi.com/v2/beers'
const searchQuery = term => `${API}?beer_name=${encodeURIComponent(term)}`

export function fetchBeersEpic(action$) {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    // filter(({payload}) => payload.trim() !== ''),
    switchMap(({payload}) => {
      return concat(
        of(setStatus('pending')),
        ajax.getJSON(searchQuery(payload)).pipe(
          delay(5000), // simulate network busy, delay
          // accepts any observable until CANCEL, then unsubscribe to the ajax request
          takeUntil(action$.pipe(ofType(CANCEL))),
          map(fetchFulfilled),
          catchError(error => {
            return of(fetchFailed(error.response.message))
          }),
        ),
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
