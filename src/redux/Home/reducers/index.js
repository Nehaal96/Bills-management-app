import {combineReducers} from 'redux';
import homeView from './home-view.reducer';

const homeViewReducer = combineReducers({
  homeView,
});

export default homeViewReducer;
