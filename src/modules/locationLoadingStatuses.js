import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE
} from './location';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  errorObj: null
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATION_REQUEST:
      return { ...state, loading: true };

    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false
      };

    case GET_LOCATION_FAILURE: {
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
