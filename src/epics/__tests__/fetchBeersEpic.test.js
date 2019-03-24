import {TestScheduler} from 'rxjs/testing'
import {of} from 'rxjs'
import {
  search,
  setStatus,
  fetchFailed,
  fetchFulfilled,
  reset,
  cancel,
} from '../../reducers/beersAction'
import {initialState} from '../../reducers/configReducer'
import {fetchBeersEpic} from '../fetchBeersEpic'

let testScheduler
beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })
})

it('produces correct success actions', function() {
  testScheduler.run(({hot, cold, expectObservable}) => {
    const action$ = hot('a', {
      a: search('ship'),
    })
    const state$ = of({
      config: initialState,
    })
    const dependencies = {
      getJSON: url => {
        return cold('-a', {
          a: [{name: 'Beer 1'}],
        })
      },
    }

    const output$ = fetchBeersEpic(action$, state$, dependencies)

    expectObservable(output$).toBe('500ms ab', {
      a: setStatus('pending'),
      b: fetchFulfilled([{name: 'Beer 1'}]),
    })
  })
})

it('produces correct error actions', function() {
  testScheduler.run(({hot, cold, expectObservable}) => {
    const action$ = hot('a', {
      a: search('ship'),
    })
    const state$ = of({
      config: initialState,
    })
    const dependencies = {
      getJSON: url => {
        return cold('-#', null, {
          response: {
            message: 'Sorry, an error has occurred',
          },
        })
      },
    }
    const output$ = fetchBeersEpic(action$, state$, dependencies)

    expectObservable(output$).toBe('500ms ab', {
      a: setStatus('pending'),
      b: fetchFailed('Sorry, an error has occurred'),
    })
  })
})

it('produces correct reset actions', function() {
  testScheduler.run(({hot, cold, expectObservable}) => {
    const action$ = hot('a 500ms -b', {
      a: search('ship'),
      b: cancel(),
    })
    const state$ = of({
      config: initialState,
    })
    const dependencies = {
      getJSON: url => cold('---a'),
    }
    const output$ = fetchBeersEpic(action$, state$, dependencies)

    expectObservable(output$).toBe('500ms a-b', {
      a: setStatus('pending'),
      b: reset(),
    })
  })
})
