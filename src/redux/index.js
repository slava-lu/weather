import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = __DEV__
  ? composeWithDevTools(applyMiddleware(sagaMiddleware))
  : compose(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
