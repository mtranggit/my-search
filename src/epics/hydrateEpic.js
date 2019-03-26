import {CACHE_KEY} from './persistEpic'
import {setConfig} from '../actions/configAction'
import {EMPTY, of} from 'rxjs'
export function hydrateEpic() {
  const maybeConfig = localStorage.getItem(CACHE_KEY)
  if (typeof maybeConfig === 'string') {
    try {
      const parsed = JSON.parse(maybeConfig)
      return of(setConfig(parsed))
    } catch (e) {
      return EMPTY
    }
  }
  return EMPTY
}
