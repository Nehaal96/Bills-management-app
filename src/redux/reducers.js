import { combineReducers } from 'redux';
import homeViewReducer from '../redux/Home/reducers';

const appReducer = combineReducers({
  homeViewReducer
});

export default rootReducer = (state, action) => {
  return appReducer(state, action);
};
