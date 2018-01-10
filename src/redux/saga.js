import { all } from 'redux-saga/effects';

import { weatherSaga } from '../modules/weather';
import { locationSaga } from '../modules/location';

const rootSaga = function* () {
  yield all([
    weatherSaga(),
    locationSaga()
  ]);
};

export default rootSaga;
