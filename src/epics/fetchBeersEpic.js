import {ajax} from 'rxjs/ajax'
import {map, tap, ignoreElements} from 'rxjs/operators'
import {fetchBeersFulfilled} from '../reducers/beersAction'

const API = 'https://api.punkapi.com/v2/beers'

export function fetchBeersEpic() {
  return ajax.getJSON(API).pipe(
    map(fetchBeersFulfilled),
    // tap(console.log),
    // ignoreElements(),
  )
}
