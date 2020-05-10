import {takeLatest} from 'redux-saga/effects';
import { updateData, addTotal, addUnAlteredData } from './home-view.saga';
import constants from '../constants';

export default function* homeViewSagas() {
  yield takeLatest(constants.UPDATE_DATA, updateData);
  yield takeLatest(constants.ADD_TOTAL, addTotal);
  yield takeLatest(constants.ADD_UNALTERED_DATA, addUnAlteredData);
}
