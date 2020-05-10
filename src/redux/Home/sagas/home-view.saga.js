import { put } from 'redux-saga/effects';
import {
    updateDataSuccess,
    updateDataFailure,
    addTotalSuccess,
    addTotalFailure,
    addUnAlteredDataSuccess,
    addUnAlteredDataFailure
  } from '../actions/home-view.actions';

export function* updateData(action) {
    const {data} = action;
    try {
      console.log('addData saga', data)
      yield put(updateDataSuccess(data));
    } catch (error) {
      yield put(updateDataFailure(error));
    }
}

export function* addTotal(action) {
  const {data} = action;
  try {
    console.log('addTotal saga', data)
    yield put(addTotalSuccess(data));
  } catch (error) {
    yield put(addTotalFailure(error));
  }
}

export function* addUnAlteredData(action) {
  const {data} = action;
  try {
    console.log('addUnAlteredData saga', data)
    yield put(addUnAlteredDataSuccess(data));
  } catch (error) {
    yield put(addUnAlteredDataFailure(error));
  }
}

