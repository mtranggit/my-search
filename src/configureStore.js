import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {appReducer} from './reducers/appReducer'
import {beersReducer} from './reducers/beersReducer'
import {configReducer} from './reducers/configReducer'

import {combineEpics, createEpicMiddleware} from 'redux-observable'
// import {of} from 'rxjs'
// import {delay} from 'rxjs/operators'
import {fetchBeersEpic} from './epics/fetchBeersEpic'

// const epic1 = () => of({type: 'SET_NAME', payload: 'Richard'}).pipe(delay(2000))

export function configureStore() {
  const rootEpic = combineEpics(fetchBeersEpic)

  const epicMiddleware = createEpicMiddleware()

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer,
    config: configReducer,
  })

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  )

  epicMiddleware.run(rootEpic)

  return store
}
