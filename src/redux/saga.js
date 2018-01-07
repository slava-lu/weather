import { all } from 'redux-saga/effects';

import { weatherSaga } from '../modules/weather';

const rootSaga = function* () {
  yield all([
    weatherSaga()
  ]);
};

export default rootSaga;
