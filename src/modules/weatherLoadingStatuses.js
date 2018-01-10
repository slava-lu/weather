import {
  GET_WEATHER_FORECAST_REQUEST,
  GET_WEATHER_FORECAST_SUCCESS,
  GET_WEATHER_FORECAST_FAILURE
} from './weather';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  errorObj: null
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WEATHER_FORECAST_REQUEST:
      return { ...state, loading: true };

    case GET_WEATHER_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false
      };

    case GET_WEATHER_FORECAST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorObj: payload
      };
    }

    default:
      return state;
  }
}
