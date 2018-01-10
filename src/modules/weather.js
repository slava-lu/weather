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
  isFahrenheit: true,
  currentIndex: 0,
  forecastLength: 0,
  weatherForecast: []
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TO_CELSIUS:
      return { ...state, isFahrenheit: false };

    case CHANGE_TO_FAHRENHEIT:
      return { ...state, isFahrenheit: true };

    case INCREASE_INDEX:
      return { ...state, currentIndex: state.currentIndex + payload };

    case DECREASE_INDEX:
      return { ...state, currentIndex: state.currentIndex - payload };

    case SET_INDEX:
      return { ...state, currentIndex: payload };

    case GET_WEATHER_FORECAST_SUCCESS:
      return {
        ...state,
        weatherForecast: payload.forecast,
        forecastLength: payload.forecastLength
      };
    default:
      return state;
  }
}

export const getWeatherForecast = () => {
  return {
    type: GET_WEATHER_FORECAST_TRIGGER
  };
};

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
    const result = yield call(getWeatherForecastRequest);
    if (result.response.ok) {
      const weatherData = result.data;
      const forecast = weatherData.query.results.channel.item.forecast;
      const forecastLength = forecast.length;
      yield put({ type: GET_WEATHER_FORECAST_SUCCESS, payload: { forecast, forecastLength } });
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
