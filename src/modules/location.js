import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Location, Permissions } from 'expo';

const moduleName = 'location';

export const GET_LOCATION_TRIGGER = `${moduleName}/GET_LOCATION_TRIGGER`;
export const GET_LOCATION_REQUEST = `${moduleName}/GET_LOCATION_REQUEST`;
export const GET_LOCATION_SUCCESS = `${moduleName}/GET_LOCATION_SUCCESS`;
export const GET_LOCATION_FAILURE = `${moduleName}/GET_LOCATION_FAILURE`;

const initialState = {
  locationData: {}
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATION_SUCCESS:
      return { ...state, locationData: payload };

    default:
      return state;
  }
}

export const getLocation = () => {
  return {
    type: GET_LOCATION_TRIGGER
  };
};

const getLocationSaga = function* () {
  yield put({ type: GET_LOCATION_REQUEST });
  try {
    const { status } = yield call(Permissions.askAsync, Permissions.LOCATION);
    if (status === 'granted') {
      const location = yield call(Location.getCurrentPositionAsync, {});
      yield put({ type: GET_LOCATION_SUCCESS, payload: location  });
    } else {
      yield put({ type: GET_LOCATION_FAILURE, payload: 'Permission to access location was denied' });
    }
  } catch (error) {
    yield put({ type: GET_LOCATION_FAILURE, payload: { isClientError: true, errorMessage: error.message } });
  }
};

export const locationSaga = function* () {
  yield all([
    takeEvery(GET_LOCATION_TRIGGER, getLocationSaga)
  ]);
};
