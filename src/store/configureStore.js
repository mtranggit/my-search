import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {appReducer} from '../reducers/appReducer'
import {beersReducer} from '../reducers/beersReducer'
import {configReducer} from '../reducers/configReducer'

import {combineEpics, createEpicMiddleware} from 'redux-observable'
// import {of} from 'rxjs'
// import {delay} from 'rxjs/operators'
import {fetchBeersEpic} from '../epics/fetchBeersEpic'
import {persistEpic} from '../epics/persistEpic'
import {hydrateEpic} from '../epics/hydrateEpic'
import {ajax} from 'rxjs/ajax'

import createSagaMiddleware from 'redux-saga'
import starwarsReducer from '../reducers/starwarsReducer'
// import starwarsSaga from '../sagas/starwarsSaga'
import sagas from '../sagas'

// const epic1 = () => of({type: 'SET_NAME', payload: 'Michael'}).pipe(delay(2000))

export function configureStore(dependencies = {}) {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic)

  // inject dependencies into our epics
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      getJSON: ajax.getJSON,
      ...dependencies,
    },
  })
  // const epicMiddleware = createEpicMiddleware()

  // saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer,
    config: configReducer,
    starwars: starwarsReducer,
  })

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware, sagaMiddleware)),
  )

  epicMiddleware.run(rootEpic)

  sagaMiddleware.run(sagas)

  return store
}
