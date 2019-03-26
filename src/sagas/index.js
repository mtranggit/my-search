import {all} from 'redux-saga/effects'
import beersSaga from './beersSaga'
import starwarsSaga from './starwarsSaga'

const sagas = [...beersSaga, ...starwarsSaga]

export default function* root() {
  yield all(sagas)
}
