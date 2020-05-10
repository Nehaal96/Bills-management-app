import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootReducers from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import rootSagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [createLogger({collapsed: true}), sagaMiddleware];
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['homeViewReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: true,
    })
  : compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));
const persistor = persistStore(store);
sagaMiddleware.run(rootSagas);

export {store, persistor};
