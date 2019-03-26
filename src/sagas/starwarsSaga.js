import {call, put, take, takeLatest} from 'redux-saga/effects'

import {
  FETCH_STAR_WARS_REQUEST,
  fetchStarwarsSuccess,
  CONFIRM_STAR_WARS_FETCH_REQUEST,
} from '../actions/starwarsAction'
import axios from 'axios'

const STARWARS_PEOPLE_URL = 'https://swapi.co/api/people/'

export const api = url =>
  axios.get(url).then(response => {
    console.log(response)
    return response.data
  })

export function* fetchPerson(action) {
  try {
    console.log('before confirm fetch request')
    yield take(CONFIRM_STAR_WARS_FETCH_REQUEST)
    console.log('after confirm fetch request')
    const person = yield call(api, STARWARS_PEOPLE_URL)
    yield put(fetchStarwarsSuccess(person.results))
  } catch (e) {
    console.error(e)
  }
}

export function* starwarsSaga() {
  yield takeLatest(FETCH_STAR_WARS_REQUEST, fetchPerson)
}

export default [takeLatest(FETCH_STAR_WARS_REQUEST, fetchPerson)]
