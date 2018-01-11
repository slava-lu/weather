import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { offline } from '@redux-offline/redux-offline';
import createSagaMiddleware from 'redux-saga';

import defaultOfflineConfig from '@redux-offline/redux-offline/lib/defaults';

import reducer from './reducer';
import rootSaga from './saga';

const offlineConfig = {
  ...defaultOfflineConfig,
  persistOptions: {
    whitelist: [
      'weather'
    ]
  }
};

const sagaMiddleware = createSagaMiddleware();

const enhancer = __DEV__
  ? composeWithDevTools(applyMiddleware(sagaMiddleware), offline(offlineConfig))
  : compose(applyMiddleware(sagaMiddleware), offline(offlineConfig));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
