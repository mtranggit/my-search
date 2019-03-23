import {ofType} from 'redux-observable'
import {SET_CONFIG} from '../reducers/configAction'
import {pluck, tap, withLatestFrom, ignoreElements} from 'rxjs/operators'

export const CACHE_KEY = 'ro-config'

export function persistEpic(action$, state$) {
  return action$.pipe(
    ofType(SET_CONFIG),
    withLatestFrom(state$.pipe(pluck('config'))),
    tap(([action, config]) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(config))
    }),
    ignoreElements(),
  )
}
