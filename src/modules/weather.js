import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { getWeatherForecastRequest } from '../utils/weather/weatherFunctions';

const moduleName = 'weather';

export const GET_WEATHER_FORECAST_TRIGGER = `${moduleName}/GET_WEATHER_FORECAST_TRIGGER`;
export const GET_WEATHER_FORECAST_REQUEST = `${moduleName}/GET_WEATHER_FORECAST_REQUEST`;
export const GET_WEATHER_FORECAST_SUCCESS = `${moduleName}/GET_WEATHER_FORECAST_SUCCESS`;
export const GET_WEATHER_FORECAST_FAILURE = `${moduleName}/GET_WEATHER_FORECAST_FAILURE`;

const INCREASE_INDEX = `${moduleName}/INCREASE_INDEX`;
const DECREASE_INDEX = `${moduleName}/DECREASE_INDEX`;
const SET_INDEX = `${moduleName}/SET_INDEX`;

const CHANGE_TO_CELSIUS = `${moduleName}/CHANGE_TO_CELSIUS`;
const CHANGE_TO_FAHRENHEIT = `${moduleName}/CHANGE_TO_FAHRENHEIT`;

const initialState = {
  isCelsius: true,
  currentIndex: 0,
  forecastLength: 0,
  currentTemp: null,
  city: '',
  forecast: []
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TO_CELSIUS:
      return { ...state, isCelsius: true };

    case CHANGE_TO_FAHRENHEIT:
      return { ...state, isCelsius: false };

    case INCREASE_INDEX:
      return { ...state, currentIndex: state.currentIndex + payload };

    case DECREASE_INDEX:
      return { ...state, currentIndex: state.currentIndex - payload };

    case SET_INDEX:
      return { ...state, currentIndex: payload };

    case GET_WEATHER_FORECAST_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
}

const getLocation = state => state.location;

export const increaseIndex = value => {
  return {
    type: INCREASE_INDEX,
    payload: value
  };
};

export const setIndex = value => {
  return {
    type: SET_INDEX,
    payload: value
  };
};

export const changeToCelsius = () => {
  return {
    type: CHANGE_TO_CELSIUS
  };
};

export const changeToFahrenheit = () => {
  return {
    type: CHANGE_TO_FAHRENHEIT
  };
};

export const decreaseIndex = value => {
  return {
    type: DECREASE_INDEX,
    payload: value
  };
};

const getWeatherForecastSaga = function* () {
  yield put({ type: GET_WEATHER_FORECAST_REQUEST });
  try {
    const { locationData: { coords: { longitude, latitude } } } = yield select(getLocation);
    const result = yield call(getWeatherForecastRequest, latitude, longitude );
    if (result.response.ok) {
      const weatherData = result.data;
      const forecast = weatherData.query.results.channel.item.forecast;
      const city = weatherData.query.results.channel.location.city;
      const forecastLength = forecast.length;
      const currentTemp = weatherData.query.results.channel.item.condition.temp;
      yield put({ type: GET_WEATHER_FORECAST_SUCCESS, payload: { forecast, forecastLength, city, currentTemp } });
    } else {
      const { serverError, status: errorStatusCode } = result.error;
      yield put({ type: GET_WEATHER_FORECAST_FAILURE, payload: { isServerError: true, serverError, errorStatusCode } });
    }
  } catch (error) {
    yield put({ type: GET_WEATHER_FORECAST_FAILURE, payload: { isClientError: true, errorMessage: error.message } });
  }
};

export const weatherSaga = function* () {
  yield all([
    takeEvery(GET_WEATHER_FORECAST_TRIGGER, getWeatherForecastSaga)
  ]);
};
