import {
  all,
  cancel,
  cancelled,
  call,
  take,
  fork,
  delay,
  put,
  takeLatest,
  throttle,
} from 'redux-saga/effects'
import axios from 'axios'

import {
  fetchFulfilled,
  fetchFailed,
  DEBOUNCE_INPUT_CHANGE,
  THROTTLE_INPUT_CHANGE,
  SEARCH,
  CANCEL,
} from '../actions/beersAction'

const API = 'https://api.punkapi.com/v2/beers'
const getSearchUrl = term => `${API}?beer_name=${encodeURIComponent(term)}`

// workers
function* inputWorker(action) {
  console.log('Input workers')
  try {
    yield delay(300)
    const {payload: input} = action
    const url = getSearchUrl(input)
    const {data} = yield call(axios.get, url)

    const isCancelled = yield cancelled()

    if (!isCancelled) {
      yield put(fetchFulfilled(data))
    }
  } catch (err) {
    console.error(err)
    yield put(fetchFailed(err.response.message))
  }
}

export function* inputWatcher() {
  let task = null
  while (true) {
    const action = yield take(DEBOUNCE_INPUT_CHANGE)
    if (task) {
      yield cancel(task)
    }
    task = yield fork(inputWorker, action)
  }
}

export function* throttleWatcher() {
  yield throttle(500, THROTTLE_INPUT_CHANGE, inputWorker)
}

export function* beersSaga() {
  yield all([
    takeLatest(DEBOUNCE_INPUT_CHANGE, inputWorker),
    throttle(500, THROTTLE_INPUT_CHANGE, inputWorker),
  ])
}

export default [
  takeLatest(DEBOUNCE_INPUT_CHANGE, inputWorker),
  throttle(500, THROTTLE_INPUT_CHANGE, inputWorker),
]
