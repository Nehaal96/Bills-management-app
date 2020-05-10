import {all, fork} from 'redux-saga/effects';
import * as homeViewSagas from './Home/sagas';

export default function* rootSagas() {
  yield all(
    [
      ...Object.values(homeViewSagas),
    ].map(fork),
  );
}
