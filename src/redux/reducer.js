import { combineReducers } from 'redux';
import weather from '../modules/weather';
import weatherAPI from '../modules/tracking/weatherAPI';
import location from '../modules/location';

const rootReducer = combineReducers({
  weather,
  weatherAPI,
  location
});

export default rootReducer;
